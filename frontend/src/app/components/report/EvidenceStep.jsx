import { useState } from 'react';
import { GlassCard } from '../shared/GlassCard';
import { Button } from '../ui/button';
import { ChevronLeft, Upload, Image, Video, Mic, X, FileText } from 'lucide-react';

export function EvidenceStep({ files, onNext, onBack }) {
  const [uploadedFiles, setUploadedFiles] = useState(files);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type.startsWith('video/')) return Video;
    if (file.type.startsWith('audio/')) return Mic;
    return FileText;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Upload Evidence
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          প্রমাণ আপলোড করুন - Add photos, videos, or audio recordings (Optional but recommended)
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors bg-card/20">
          <input
            type="file"
            id="evidence"
            multiple
            accept="image/*,video/*,audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="evidence" className="cursor-pointer">
            <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Click to upload or drag and drop
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Images, Videos, or Audio files (Max 50MB per file)
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Image className="w-4 h-4" />
                <span>JPG, PNG</span>
              </div>
              <div className="flex items-center space-x-1">
                <Video className="w-4 h-4" />
                <span>MP4, AVI</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mic className="w-4 h-4" />
                <span>MP3, WAV</span>
              </div>
            </div>
          </label>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Uploaded Files ({uploadedFiles.length})</h4>
            {uploadedFiles.map((file, index) => {
              const FileIcon = getFileIcon(file);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-card/40 border border-border rounded-lg"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Box */}
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-xs text-foreground">
            <span className="font-semibold">🔒 Privacy:</span> All evidence is automatically encrypted 
            before upload. File metadata (like location and device info) is stripped for your protection.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="px-6 py-6 border-border hover:bg-card/60"
          size="lg"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={() => onNext(uploadedFiles)}
          className="px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </GlassCard>
  );
}
