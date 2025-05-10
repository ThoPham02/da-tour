import {
  ExternalLink,
  Edit2,
  Trash,
  DollarSign,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { apiGetOrderById } from "../../../store/services/authService";
import { useEffect, useState } from "react";
import { Order } from "../../../types/tour";
import OrderModal from "../../../components/addOrder/OrderModal";

interface OrderActionProps {
  orderStatus: number;
  orderID: number;
}

const OrderActionButton: React.FC<OrderActionProps> = ({
  orderStatus,
  orderID,
}) => {
  const [selectOrder, setSelectOrder] = useState<Order>();
  const [type, setType] = useState<string>("");
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const resp = await apiGetOrderById(orderID);

      setSelectOrder(resp || {} as Order);
    };
    fetchOrder();
  }, []);


  const handleAction = (type: string) => {
    switch (type) {
      case "view":
        setType("view");

        setIsOrderOpen(true);
        break;
      case "edit":
        setType("edit");
        
        setIsOrderOpen(true);
        break;
      case "confirm":
        setType("confirm");
        break;
      case "add_payment":
        setType("add_payment");
        break;
      case "cancel":
        setType("cancel");
        break;
      case "delete":
        setType("delete");

        break;
      default:
        break;
    }
  };

  const isPending = orderStatus === 1;
  const isConfirmed = orderStatus === 2;

  return (
    <div className="absolute right-0 mr-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      <button
        onClick={() => handleAction("view")}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <ExternalLink className="inline-block w-4 h-4 mr-2" />
        View
      </button>

      {(isPending || isConfirmed) && (
        <button
          onClick={() => handleAction("edit")}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Edit2 className="inline-block w-4 h-4 mr-2" />
          Edit
        </button>
      )}

      {isPending && (
        <button
          onClick={() => handleAction("confirm")}
          className="block w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
        >
          <CheckCircle className="inline-block w-4 h-4 mr-2" />
          Confirm
        </button>
      )}

      {isConfirmed && (
        <button
          onClick={() => handleAction("add_payment")}
          className="block w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50"
        >
          <DollarSign className="inline-block w-4 h-4 mr-2" />
          Add Payment
        </button>
      )}

      {isConfirmed && (
        <button
          onClick={() => handleAction("cancel")}
          className="block w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50"
        >
          <XCircle className="inline-block w-4 h-4 mr-2" />
          Cancel
        </button>
      )}

      {isPending && (
        <button
          onClick={() => handleAction("delete")}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <Trash className="inline-block w-4 h-4 mr-2" />
          Delete
        </button>
      )}
    
      {isOrderOpen && 
      <OrderModal 
      isOpen={isOrderOpen} 
      onClose={() => setIsOrderOpen(false)}
      typeInput={type} 
      order={selectOrder} />}
    </div>
  );
};

export default OrderActionButton;
