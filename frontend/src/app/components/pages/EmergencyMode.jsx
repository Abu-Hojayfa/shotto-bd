import {useState, useEffect} from "react";

import {
  X,
  Trash2,
  PhoneOff,
  User,
  ShieldAlert,
  Phone,
  Gavel,
  Siren,
  MapPin,
  Clock3,
  ShieldCheck,
  BellRing,
  AlertTriangle,
  Activity,
  Flame,
  Ambulance,
  Shield,
} from "lucide-react";

import {motion, AnimatePresence} from "motion/react";

import {useNavigate} from "react-router";

import socket from "../../../socket/socket";

export function EmergencyMode () {
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [activeCall, setActiveCall] = useState(null);

  const [callTimer, setCallTimer] = useState(0);

  const [sosActive, setSosActive] = useState(false);

  const [sosStatus, setSosStatus] = useState("Idle");

  const [showEmergencyForm, setShowEmergencyForm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [latestEmergency, setLatestEmergency] = useState(null);

  const [emergencies, setEmergencies] = useState([]);

  const [currentTime, setCurrentTime] = useState("");

  const [dangerLevel, setDangerLevel] = useState("Safe");

  // =========================
  // FORM STATES
  // =========================

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [severity, setSeverity] = useState("medium");

  const [location, setLocation] = useState("");

  // =========================
  // LIVE CLOCK
  // =========================

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // DANGER LEVEL
  // =========================

  useEffect(() => {
    if (emergencies.length >= 10) {
      setDangerLevel("Critical");
    } else if (emergencies.length >= 5) {
      setDangerLevel("High");
    } else if (emergencies.length >= 1) {
      setDangerLevel("Medium");
    } else {
      setDangerLevel("Safe");
    }
  }, [emergencies]);

  // =========================
  // SOCKETS & ALERT SOUND
  // =========================

  useEffect(() => {
    let audioInstance = null;
    let soundTimeout = null;

    socket.on("newEmergency", (emergency) => {
      setLatestEmergency(emergency);

      setEmergencies((prev) => {
        const exists = prev.find((item) => item._id === emergency._id);

        if (exists) {
          return prev;
        }

        return [emergency, ...prev];
      });

      // Stop any existing audio instance before starting a new one
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.currentTime = 0;
      }
      if (soundTimeout) {
        clearTimeout(soundTimeout);
      }

      // Browser notification sound configuration
      audioInstance = new Audio(
        "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      );

      // Enable looping to make it sound for more than 30 seconds
      audioInstance.loop = true;
      audioInstance.play().catch((err) => console.log("Audio play failed:", err));

      // Automatically turn off the alarm sound after 32 seconds
      soundTimeout = setTimeout(() => {
        if (audioInstance) {
          audioInstance.pause();
          audioInstance.currentTime = 0;
        }
      }, 32000);
    });

    return () => {
      socket.off("newEmergency");
      if (audioInstance) {
        audioInstance.pause();
      }
      if (soundTimeout) {
        clearTimeout(soundTimeout);
      }
    };
  }, []);

  // =========================
  // FETCH EMERGENCIES
  // =========================

  useEffect(() => {
    fetch("http://localhost:5000/api/emergency")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setEmergencies(data.data);

          if (data.data.length > 0) {
            setLatestEmergency(data.data[0]);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // =========================
  // CALL TIMER
  // =========================

  useEffect(() => {
    let interval;

    if (activeCall) {
      interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setCallTimer(0);
    }

    return () => clearInterval(interval);
  }, [activeCall]);

  // =========================
  // FORMAT TIME
  // =========================

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // =========================
  // SOS
  // =========================

  const startSOS = () => {
    setSosActive(true);

    setShowEmergencyForm(true);

    setSosStatus("Emergency Activated");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;

        const lng = position.coords.longitude;

        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        )
          .then((res) => res.json())
          .then((data) => {
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "";

            const country = data.address.country || "";

            setLocation(`${city}, ${country}`);
          })
          .catch(() => {
            setLocation("Location unavailable");
          });
      },

      () => {
        setLocation("Location unavailable");
      }
    );
  };

  // =========================
  // CREATE EMERGENCY
  // =========================

  const createEmergency = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/emergency", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          description,
          category,
          severity,
          location,
        }),
      });

      const data = await response.json();

      console.log("Emergency response:", data);

      if (!response.ok) {
        alert(data.message || "Failed to submit");

        setLoading(false);

        return;
      }

      alert("Emergency Submitted Successfully");

      setEmergencies((prev) => [data.data, ...prev]);

      setLatestEmergency(data.data);

      setTitle("");

      setDescription("");

      setCategory("");

      setSeverity("medium");

      setLocation("");

      setSosActive(false);

      setShowEmergencyForm(false);

      setSosStatus("Idle");
    } catch (error) {
      console.log(error);

      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE EMERGENCY
  // =========================

  const deleteEmergency = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/emergency/${id}`, {
        method: "DELETE",
      });

      setEmergencies((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);

      alert("Delete failed");
    }
  };

  // =========================
  // CLEAR SESSION
  // =========================

  const clearSession = () => {
    localStorage.clear();

    navigate("/");
  };

  // =========================
  // RIGHTS
  // =========================

  const legalRights = [
    {
      id: 1,
      title: "Right to Silence",

      desc: "You are not obligated to speak without a lawyer present.",
    },

    {
      id: 2,
      title: "No Warrant, No Entry",

      desc: "Authorities must show a valid warrant to enter private property.",
    },

    {
      id: 3,
      title: "Phone Access",

      desc: "You have the right to inform your family about your location.",
    },

    {
      id: 4,
      title: "No Undue Force",

      desc: "The law prohibits physical torture or harassment during inquiry.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* BACKGROUND */}

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.15),transparent_40%)]" />

        <motion.div
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute top-0 left-0 right-0 h-1 bg-red-500"
        />
      </div>

      {/* ALERT - SLIM & COMPACT VERSION */}

      <AnimatePresence>
        {latestEmergency && (
          <motion.div
            initial={{
              y: -100,
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: -100,
            }}
            className="bg-red-600 text-white py-2 px-4 text-xs md:text-sm text-center font-semibold shadow-md relative z-50 flex items-center justify-center gap-2"
          >
            <span>🚨 ACTIVE ALERT:</span>
            <span className="font-normal">
              {latestEmergency.title} ({latestEmergency.location})
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}

      <div className="flex items-center justify-between p-6">
        <button
          onClick={() => navigate("/")}
          className="p-3 bg-card border border-border rounded-full hover:scale-110 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
            <Clock3 className="w-4 h-4 text-primary" />

            <span className="text-sm font-bold">{currentTime}</span>
          </div>
        </div>
      </div>

      {/* ACTIVE ALERTS */}

      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Alerts</p>

              <h2 className="text-4xl font-black mt-2">{emergencies.length}</h2>
            </div>

            <BellRing className="text-red-500 w-12 h-12 animate-pulse" />
          </div>
        </div>
      </div>

      {/* SOS SECTION */}

      <div className="text-center mb-12">
        <motion.button
          whileTap={{
            scale: 0.92,
          }}
          animate={{
            boxShadow: sosActive
              ? [
                "0 0 0px rgba(255,0,0,0.4)",
                "0 0 50px rgba(255,0,0,0.8)",
                "0 0 0px rgba(255,0,0,0.4)",
              ]
              : "",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          onClick={startSOS}
          className={`relative w-56 h-56 rounded-full border-4 flex flex-col items-center justify-center mx-auto transition-all duration-500 ${sosActive
            ? "border-red-500 bg-red-500/20"
            : "border-green-500 bg-green-500/20"
            }`}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <ShieldAlert
              className={`w-20 h-20 mb-4 ${sosActive ? "text-red-500" : "text-green-500"
                }`}
            />
          </motion.div>

          <span className="text-2xl font-black uppercase">
            {sosActive ? "SOS ACTIVE" : "PRESS SOS"}
          </span>
        </motion.button>
      </div>

      {/* EMERGENCY FORM (DISPLAYED DIRECTLY UNDER SOS SECTION WHEN ACTIVE) */}

      <AnimatePresence>
        {showEmergencyForm && (
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 50,
            }}
            className="max-w-2xl mx-auto px-4 mb-12"
          >
            <div className="bg-card border border-border rounded-3xl p-8 space-y-5 shadow-2xl">
              <div className="flex items-center gap-3">
                <Siren className="text-red-500 w-8 h-8 animate-pulse" />

                <h2 className="text-3xl font-black">Emergency Report</h2>
              </div>

              <input
                type="text"
                placeholder="Emergency Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 rounded-2xl bg-background border border-border outline-none"
              />

              <textarea
                rows={5}
                placeholder="Describe the emergency..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 rounded-2xl bg-background border border-border outline-none"
              />

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-4 rounded-2xl bg-background border border-border outline-none"
              />

              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-primary w-5 h-5" />

                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 p-4 rounded-2xl bg-background border border-border outline-none"
                />
              </div>

              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full p-4 rounded-2xl bg-background border border-border outline-none"
              >
                <option value="low">Low</option>

                <option value="medium">Medium</option>

                <option value="high">High</option>

                <option value="critical">Critical</option>
              </select>

              <button
                disabled={loading}
                onClick={createEmergency}
                className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 transition-all font-black text-lg hover:scale-[1.02]"
              >
                {loading ? "Submitting..." : "Send Emergency Alert"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HOTLINES */}

      <div className="max-w-6xl mx-auto px-4 mb-16 grid md:grid-cols-4 gap-4">
        <a
          href="tel:999"
          className="p-6 rounded-3xl bg-red-600 text-white flex flex-col items-center hover:scale-105 transition-all"
        >
          <Phone className="w-10 h-10" />

          <span className="mt-3 text-xl font-black">Police</span>

          <span className="text-sm">999</span>
        </a>

        <a
          href="tel:199"
          className="p-6 rounded-3xl bg-orange-500 text-white flex flex-col items-center hover:scale-105 transition-all"
        >
          <Ambulance className="w-10 h-10" />

          <span className="mt-3 text-xl font-black">Ambulance</span>

          <span className="text-sm">199</span>
        </a>

        <a
          href="tel:9555555"
          className="p-6 rounded-3xl bg-blue-600 text-white flex flex-col items-center hover:scale-105 transition-all"
        >
          <Shield className="w-10 h-10" />

          <span className="mt-3 text-xl font-black">Security</span>

          <span className="text-sm">Hotline</span>
        </a>

        <a
          href="tel:109"
          className="p-6 rounded-3xl bg-yellow-500 text-white flex flex-col items-center hover:scale-105 transition-all"
        >
          <Flame className="w-10 h-10" />

          <span className="mt-3 text-xl font-black">Fire Service</span>

          <span className="text-sm">109</span>
        </a>
      </div>

      {/* LIVE EMERGENCIES */}

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black">Live Emergencies</h2>

          <div className="px-5 py-2 rounded-full bg-red-500/20 text-red-500 font-black animate-pulse">
            {emergencies.length} Active
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {emergencies.map((item, index) => (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              key={index}
              className="p-6 bg-card border border-border rounded-3xl hover:border-red-500/40 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-black text-xl">{item.title}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-500 font-bold uppercase">
                    {item.severity}
                  </span>

                  <button
                    onClick={() => deleteEmergency(item._id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              <p className="text-muted-foreground mb-5">{item.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />

                  {item.category}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />

                  {item.location}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
                <span className="text-primary font-semibold">
                  Reported by: {item?.user?.fullName || "Anonymous"}
                </span>

                <span className="text-muted-foreground">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHTS */}

      <div className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
          <Gavel className="text-primary" />
          Know Your Rights
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {legalRights.map((right) => (
            <motion.div
              whileHover={{
                y: -5,
              }}
              key={right.id}
              className="p-6 rounded-3xl border border-border bg-card"
            >
              <h3 className="font-black text-xl mb-3">{right.title}</h3>

              <p className="text-muted-foreground leading-relaxed">
                {right.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CALL OVERLAY */}

      <AnimatePresence>
        {activeCall && (
          <motion.div
            initial={{
              y: "100%",
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: "100%",
            }}
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="text-center"
            >
              <User className="w-28 h-28 mx-auto mb-6 text-primary" />

              <h2 className="text-3xl font-black mb-2">{activeCall.name}</h2>

              <p className="text-primary font-mono text-xl">
                {formatTime(callTimer)}
              </p>
            </motion.div>

            <button
              onClick={() => setActiveCall(null)}
              className="mt-20 w-24 h-24 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-all shadow-2xl"
            >
              <PhoneOff className="w-10 h-10 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
