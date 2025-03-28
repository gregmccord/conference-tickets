import codingConf from "../assets/images/logo-full.svg";
import gitHubLogo from "../assets/images/icon-github.svg";
import "../styles/TicketStub.css";

interface TicketStubProps {
  image: File;
  name: string;
  gitHub: string;
  ticketNumber: string;
}

function TicketStub({ image, name, gitHub, ticketNumber }: TicketStubProps) {
  return (
    <div id="ticketStubBackground">
      <div id="ticketContent">
        <div id="ticketLeft">
          <div id="upperLeft">
            <img src={codingConf} id="ticketLogo" alt="Coding Conf" />
            <span id="dateloc" className="text-base font-thin">
              Jan 31, 2026 / Austin, TX
            </span>
          </div>

          <div id="ticketBottomLeft">
            <img
              src={URL.createObjectURL(image)}
              id="avatarPhoto"
              alt="Uploaded Avatar"
            />
            <div id="userInfo">
              <span
                id="ticketNameLine"
                className="ticket-single-line font-medium"
              >
                {name}
              </span>
              <span id="ticketGitHubLine">
                <img src={gitHubLogo} id="gitHubIcon" />
                <span id="ticketGitHub" className="text-base font-thin">
                  @{gitHub}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div id="ticketRight">
          <span
            id="ticketNumber"
            className="text-3xl font-medium text-opacity-25"
          >
            #{ticketNumber}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TicketStub;
