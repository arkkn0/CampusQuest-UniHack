import { useState } from "react";
import { quests } from "./data/quests";
import { useProgress } from "./hooks/useProgress";
import HomePage from "./components/HomePage";
import QuestDetail from "./components/QuestDetail";
import QRScanner from "./components/QRScanner";
import RewardPopup from "./components/RewardPopup";
import Toast from "./components/Toast";
import "./App.css";

export default function App() {
  const { progress, completeQuest, resetProgress, level, xpProgress } = useProgress();
  const [page, setPage] = useState("home"); // "home" | "detail"
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [rewardQuest, setRewardQuest] = useState(null);
  const [toast, setToast] = useState(null);

  const handleSelectQuest = (quest) => {
    setSelectedQuest(quest);
    setPage("detail");
  };

  const handleBack = () => {
    setPage("home");
    setSelectedQuest(null);
    setShowScanner(false);
  };

  const handleScan = (apiResponse) => {
    // apiResponse contains { place, reward }
    if (!apiResponse || !apiResponse.place) {
      setToast("Unable to recognize location. Please try again.");
      return;
    }

    setShowScanner(false);

    if (!selectedQuest) return;

    // Match the recognized place to a quest by location name
    const recognizedPlace = apiResponse.place.trim();
    const matchedQuest = quests.find(q => 
      q.location.toLowerCase() === recognizedPlace.toLowerCase()
    );

    if (matchedQuest && matchedQuest.id === selectedQuest.id) {
      // Correct location for the selected quest
      completeQuest(selectedQuest);
      setRewardQuest(selectedQuest);
    } else if (matchedQuest) {
      // Recognized a different quest's location
      setToast(`That's "${matchedQuest.title}" — wrong location for this quest!`);
    } else {
      // Place not recognized or doesn't match any quest
      setToast(`Recognized: ${recognizedPlace}. This location doesn't match any quest. Keep exploring! 🗺️`);
    }
  };

  const handleRewardClose = () => {
    setRewardQuest(null);
    setPage("home");
    setSelectedQuest(null);
  };

  const handleReset = () => {
    if (window.confirm("Reset all progress? This cannot be undone.")) {
      resetProgress();
    }
  };

  return (
    <div className="app-root">
      {page === "home" && (
        <HomePage
          quests={quests}
          progress={progress}
          level={level}
          xpProgress={xpProgress}
          onSelectQuest={handleSelectQuest}
          onReset={handleReset}
        />
      )}

      {page === "detail" && selectedQuest && (
        <QuestDetail
          quest={selectedQuest}
          isCompleted={progress.completedQuests.includes(selectedQuest.id)}
          onBack={handleBack}
          onStartScan={() => setShowScanner(true)}
        />
      )}

      {showScanner && (
        <QRScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      {rewardQuest && (
        <RewardPopup
          quest={rewardQuest}
          onClose={handleRewardClose}
        />
      )}

      {toast && (
        <Toast
          message={toast}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
