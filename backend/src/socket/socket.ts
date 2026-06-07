import { Server }
  from "socket.io";

let io: Server;

export const initSocket =
  ( server: any ): void => {

    io = new Server( server, {
      cors: {
        origin: [
          "http://localhost:5173",
          "http://localhost:3000",
        ],

        credentials: true,
      },
    } );

    io.on(
      "connection",

      ( socket ) => {

        console.log(
          `⚡ Socket connected: ${ socket.id }`
        );

        socket.on(
          "disconnect",

          () => {

            console.log(
              `❌ Socket disconnected: ${ socket.id }`
            );
          }
        );
      }
    );
  };

export const getIO =
  (): Server => {

    if ( !io ) {

      throw new Error(
        "Socket.io not initialized"
      );
    }

    return io;
  };
