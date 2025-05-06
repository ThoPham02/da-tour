import { ExternalLink, Edit2, Trash, DollarSign, XCircle, CheckCircle } from "lucide-react";

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
    // TODO: Thêm logic xử lý từng action
  };

  const isPending = orderStatus === 1;
  const isConfirmed = orderStatus === 2;
  const isCancelled = orderStatus === 3;
  const isCompleted = orderStatus === 4;

  return (
    <div className="absolute right-0 mr-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      {/* View */}
      <button
        onClick={() => handleAction("view")}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <ExternalLink className="inline-block w-4 h-4 mr-2" />
        View
      </button>

      {/* Edit */}
      {(isPending || isConfirmed) && (
        <button
          onClick={() => handleAction("edit")}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Edit2 className="inline-block w-4 h-4 mr-2" />
          Edit
        </button>
      )}

      {/* Confirm (only for pending) */}
      {isPending && (
        <button
          onClick={() => handleAction("confirm")}
          className="block w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
        >
          <CheckCircle className="inline-block w-4 h-4 mr-2" />
          Confirm
        </button>
      )}

      {/* Add Payment (only for confirmed) */}
      {isConfirmed && (
        <button
          onClick={() => handleAction("add_payment")}
          className="block w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50"
        >
          <DollarSign className="inline-block w-4 h-4 mr-2" />
          Add Payment
        </button>
      )}

      {/* Cancel (only for confirmed) */}
      {isConfirmed && (
        <button
          onClick={() => handleAction("cancel")}
          className="block w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50"
        >
          <XCircle className="inline-block w-4 h-4 mr-2" />
          Cancel
        </button>
      )}

      {/* Delete (only for pending) */}
      {isPending && (
        <button
          onClick={() => handleAction("delete")}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <Trash className="inline-block w-4 h-4 mr-2" />
          Delete
        </button>
      )}
    </div>
  );
};

export default OrderActionButton;
