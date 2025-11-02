import { useState } from "react";
import { Star, Mail, Phone, Ban, Trash2, Menu } from "lucide-react";
import API from "../config/api";
import ConfirmDialog from "./confirm";
import GroupDialog from "./group";

const ContactCard = ({ contact, refreshContacts }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showGroupMenu, setShowGroupMenu] = useState(false);
  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const onToggleFavorite = async () => {
    try {
      await API.contact.updateContact(contact.id, {
        ...contact,
        favourite: !contact.favourite,
      });
      refreshContacts();
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const onToggleBlock = async () => {
    try {
      await API.contact.updateContact(contact.id, {
        ...contact,
        blocked: !contact.blocked,
      });
      refreshContacts();
    } catch (error) {
      console.error("Error updating block status:", error);
    }
  };

  const onDeleteContact = async () => {
    try {
      await API.contact.deleteContact(contact.id);
      refreshContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 min-w-0">
            {contact.avatar ? (
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                {getInitials(contact.name)}
              </div>
            )}
            <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onToggleFavorite}
              className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-yellow-400 hover:bg-yellow-50 transition-colors"
            >
              <Star
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  contact.favourite ? "text-yellow-400 fill-yellow-400" : ""
                }`}
              />
            </button>
            <button
              onClick={onToggleBlock}
              className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-50 transition-colors"
            >
              <Ban
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  contact.blocked ? "text-red-400 fill-red-400" : ""
                }`}
              />
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
             <button
              onClick={() => setShowGroupMenu(true)}
              className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-50 transition-colors"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600 space-y-2 overflow-hidden">
          {contact.email && (
            <div className="flex items-center gap-2 truncate">
              <Mail size={14} className="shrink-0" />
              <span className="truncate">{contact.email}</span>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center gap-2 truncate">
              <Phone size={14} className="shrink-0" />
              <span className="truncate">{contact.phone}</span>
            </div>
          )}
        </div>
        {contact.group?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {contact.group.map((g, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium truncate"
              >
                {g}
              </span>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={onDeleteContact}
        onCancel={() => setShowConfirm(false)}
        message={`Are you sure you want to delete ${contact.name}?`}
      />
      <GroupDialog
        isOpen={showGroupMenu}
        onComplete={refreshContacts}
        onClose={() => setShowGroupMenu(false)}
        contactId={contact.id}
        currentGroups={contact.group}
      />
    </>
  );
};

export default ContactCard;