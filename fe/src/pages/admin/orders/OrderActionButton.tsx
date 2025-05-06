import { ExternalLink, Edit2, Trash } from "lucide-react";

interface OrderActionProps {
  orderStatus: number;
  orderID: number;
}

const OrderActionButton: React.FC<OrderActionProps> = ({
  orderStatus,
  orderID,
}) => {
  const handleAction = (type: string) => {
    console.log(`${type} clicked for:`, orderID);
    console.log("Order status:", orderStatus);
    if (type === "view") {
      // Handle view action
    }
    if (type === "edit") {
      // Handle edit action
    }
    if (type === "delete") {
      // Handle delete action
    }
  };

  return (
    <div className="absolute right-0 mr-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      <button
        onClick={() => handleAction("view")}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <ExternalLink className="inline-block w-4 h-4 mr-2" />
        View
      </button>
      <button
        onClick={() => handleAction("edit")}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <Edit2 className="inline-block w-4 h-4 mr-2" />
        Edit
      </button>
      <button
        onClick={() => handleAction("delete")}
        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
      >
        <Trash className="inline-block w-4 h-4 mr-2" />
        Delete
      </button>
    </div>
  );
};

export default OrderActionButton;
