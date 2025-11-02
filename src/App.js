import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ContactSection from "./components/contactSection";
import API from "./config/api";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [activeView, setActiveView] = useState("All Contacts");
  const [searchTerm, setSearchTerm] = useState("");
  const [groupView, setGroupView] = useState("");

  const fetchAllContacts = async () => {
    try {
      const res = await API.contact.getAllContacts();
      setContacts(res.data);
      setFilteredContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  useEffect(() => {
    fetchAllContacts();
  }, []);

  useEffect(() => {
    let updated = [...contacts];

    if (activeView === "Favorites") updated = updated.filter((c) => c.favourite);
    else if (activeView === "Blocked") updated = updated.filter((c) => c.blocked);

    if (searchTerm.trim())
      updated = updated.filter((c) =>
        c.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );

    setFilteredContacts(updated);
  }, [contacts, activeView, searchTerm]);

  useEffect(() => {
    let updated = [...contacts];

    if (groupView === "Friends") updated = updated.filter((c) => c.group?.includes("Friends"));
    else if (groupView === "Family") updated = updated.filter((c) => c.group?.includes("Family"));
    else if (groupView === "Work") updated = updated.filter((c) => c.group?.includes("Work"));
    else if (groupView === "All") updated = [...contacts];

    setFilteredContacts(updated);
  }, [contacts, groupView]);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-gray-50">
      <Sidebar
        contacts={contacts}
        activeView={activeView}
        setActiveView={setActiveView}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        groupView={groupView}
        setGroupView={setGroupView}
      />

      <div className="flex-1 overflow-auto">
        <ContactSection
          contacts={filteredContacts}
          refreshContacts={fetchAllContacts}
        />
      </div>
    </div>
  );
}

export default App;