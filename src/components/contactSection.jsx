import { useState } from "react";
import ContactCard from "./contactCard";
import AddContact from "./addContact";
import NewContact from "./newContact";

const ContactSection = ({ contacts, refreshContacts }) => {
  const [isAdding, setIsAdding] = useState(false);

  const groupedContacts = contacts.reduce((acc, contact) => {
    const firstLetter = contact.name?.[0]?.toUpperCase() || "#";
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  const sortedGroups = Object.keys(groupedContacts).sort();

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-[100dvh] p-4 sm:p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4 sm:mb-6 shrink-0 bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-md border border-white/20 sticky top-0 z-10">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Contacts
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            {contacts.length} contact{contacts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <AddContact setVisible={setIsAdding} />
      </div>

      {isAdding && (
        <NewContact setVisible={setIsAdding} refreshContacts={refreshContacts} />
      )}

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {contacts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-6">
            {sortedGroups.map((letter) => (
              <div key={letter} className="col-span-full">
                <div className="text-gray-400 font-semibold text-sm mt-6 mb-2">
                  {letter}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {groupedContacts[letter].map((contact) => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      refreshContacts={refreshContacts}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-12">
            No contacts found
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactSection;
