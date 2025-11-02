import { useState, useEffect } from "react";
import API from "../config/api";

function GroupDialog({ isOpen, contactId, currentGroups = [], onClose, onComplete }) {
  const [selectedGroups, setSelectedGroups] = useState([]);

  useEffect(() => {
    if (isOpen) {
      if (Array.isArray(currentGroups)) {
        console.log("Current Groups:", currentGroups);
        setSelectedGroups(currentGroups);
      } else if (typeof currentGroups === "string" && currentGroups.trim() !== "") {
        setSelectedGroups(currentGroups.split(",").map((g) => g.trim()));
      } else {
        setSelectedGroups([]); 
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const groupOptions = ["Friends", "Family", "Work"];

  const toggleGroup = (group) => {
    setSelectedGroups((prev) =>
      prev.includes(group)
        ? prev.filter((g) => g !== group)
        : [...prev, group]
    );
  };

  async function handleUpdateGroup() {
    if (selectedGroups.length === 0)
      return alert("Please select at least one group.");

    try {
      const response = await API.contact.updateContact(contactId, {
        group: selectedGroups,
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to update contact group");
      }

      alert("Groups updated successfully!");
      onClose();
      onComplete?.();
    } catch (error) {
      console.error("Group update error:", error);
      alert("Something went wrong while updating the groups.");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-80 text-center">
        <h3 className="text-lg font-semibold mb-4">Assign Groups</h3>
        <p className="text-gray-600 mb-5 text-sm">
          Select one or more groups for this contact:
        </p>

        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {groupOptions.map((group) => (
            <button
              key={group}
              onClick={() => toggleGroup(group)}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                selectedGroups.includes(group)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateGroup}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default GroupDialog;