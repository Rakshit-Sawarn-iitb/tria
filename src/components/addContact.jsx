import { Plus } from "lucide-react";
function AddContact({setVisible}) {
    function handleClick() {
        setVisible(true);
    }
    return (
        <button
          onClick={handleClick}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} /> Add Contact
        </button>
    );
}
export default AddContact;