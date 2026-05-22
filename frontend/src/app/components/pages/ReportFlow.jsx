import { useState } from 'react';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { StepIndicator } from '../report/StepIndicator';
import { IssueTypeStep } from '../report/IssueTypeStep';
import { LocationStep } from '../report/LocationStep';
import { DetailsStep } from '../report/DetailsStep';
import { EvidenceStep } from '../report/EvidenceStep';
import { ContactStep } from '../report/ContactStep';
import { ConfirmationStep } from '../report/ConfirmationStep';

export function ReportFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [reportData, setReportData] = useState({
    issueType: '',
    district: '',
    location: '',
    description: '',
    evidence: [],
    contact: ''
  });

  const totalSteps = 6;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateReportData = (data) => {
    setReportData({ ...reportData, ...data });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

            <div className="mt-8">
              {currentStep === 1 && (
                <IssueTypeStep
                  value={reportData.issueType}
                  onNext={(issueType) => {
                    updateReportData({ issueType });
                    nextStep();
                  }}
                />
              )}
              {currentStep === 2 && (
                <LocationStep
                  district={reportData.district}
                  location={reportData.location}
                  onNext={(district, location) => {
                    updateReportData({ district, location });
                    nextStep();
                  }}
                  onBack={prevStep}
                />
              )}
              {currentStep === 3 && (
                <DetailsStep
                  value={reportData.description}
                  onNext={(description) => {
                    updateReportData({ description });
                    nextStep();
                  }}
                  onBack={prevStep}
                />
              )}
              {currentStep === 4 && (
                <EvidenceStep
                  files={reportData.evidence}
                  onNext={(evidence) => {
                    updateReportData({ evidence });
                    nextStep();
                  }}
                  onBack={prevStep}
                />
              )}
              {currentStep === 5 && (
                <ContactStep
                  value={reportData.contact}
                  onNext={(contact) => {
                    updateReportData({ contact });
                    nextStep();
                  }}
                  onBack={prevStep}
                />
              )}
              {currentStep === 6 && (
                <ConfirmationStep reportData={reportData} />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
