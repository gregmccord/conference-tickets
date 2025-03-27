import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../hooks/useFormData";
import codingConf from "../assets/images/logo-full.svg";
import { ROUTES } from "../Routes";
import TicketStub from "../components/ticketStub";
import "../styles/TicketPage.css";

function TicketPage() {
  const { formData } = useFormData();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if form data is valid
    if (
      !formData.image ||
      !formData.name ||
      !formData.email ||
      !formData.gitHub ||
      !formData.ticketNumber
    ) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [formData, navigate]);

  // TODO: I think I can remove this
  // Only render content if we have valid data
  if (
    !formData.image ||
    !formData.name ||
    !formData.email ||
    !formData.gitHub ||
    !formData.ticketNumber
  ) {
    return null;
  }

  return (
    <div className="pageContents">
      <img src={codingConf} className="pageLogo" />
      <div className="pageMainArea">
        <h1 className="pageHeader">
          Congrats, <span className="textGradient">{formData.name}</span>! Your
          ticket is ready.
        </h1>
        <span className="pageNotice text-xl font-regular">
          We've emailed your ticket to{" "}
          <span className="emailRed">{formData.email}</span> and will send you
          updates in the run up to the event.
        </span>
        <div className="ticketStubContainer">
          <TicketStub
            image={formData.image}
            name={formData.name}
            gitHub={formData.gitHub}
            ticketNumber={formData.ticketNumber}
          />
        </div>
      </div>
    </div>
  );
}

export default TicketPage;
