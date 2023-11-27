import PropTypes from "prop-types";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway);

const Modal = ({ employee }) => {
    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box w-11/12 max-w-3xl">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>

                <div className="p-5">
                    <Elements stripe={stripePromise}>
                        <PaymentForm employee={employee} />
                    </Elements>
                </div>
            </div>
        </dialog>
    );
};
Modal.propTypes = {
    employee: PropTypes.object,
};
export default Modal;
