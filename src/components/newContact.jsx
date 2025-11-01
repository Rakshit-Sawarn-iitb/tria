import API from "../config/api";
import { useState } from "react";

function NewContact({ setVisible, refreshContacts }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    avatarUrl: "",
  });

  const handleClose = () => setVisible(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      avatar:
        formData.avatarUrl ||
        `https://api.dicebear.com/9.x/avataaars/svg?seed=${formData.name}`,
      favourite: false,
      groups: [],
      lastContacted: new Date().toISOString(),
      blocked: false,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await API.contact.createContact(contactData);
      console.log("Contact created:", response.data);
      if (refreshContacts) refreshContacts();
      handleClose();
      alert("Contact added successfully!");
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Add New Contact
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone *
            </label>
            <input
              type="tel"
              name="contactNumber"
              placeholder="+1 (555) 000-0000"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Avatar URL (optional)
            </label>
            <input
              type="url"
              name="avatarUrl"
              placeholder="https://example.com/avatar.jpg"
              value={formData.avatarUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end mt-4 gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewContact;