import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../hooks/useFormData";
import { ROUTES } from "../Routes";
import FileUpload from "../components/fileUpload";
import ErrorMessage from "../components/error";
import InfoMessage from "../components/info";
import codingConf from "../assets/images/logo-full.svg";
import "../styles/HomePage.css";

function HomePage() {
  const [imageError, setImageError] = useState(false);
  const [fileRejected, setFileRejected] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [gitHubError, setGitHubError] = useState(false);
  const { formData, setFormData } = useFormData();
  const navigate = useNavigate();

  // Handle name
  const verifyName = (name: string) => {
    return name.trim() !== "";
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
    setNameError(false);
  };
  const handleNameBlur = () => {
    if (verifyName(formData.name)) setNameError(false);
    else setNameError(true);
  };

  // Handle email
  const verifyEmail = (emailString: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailString);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
    setEmailError(false);
  };
  const handleEmailBlur = () => {
    if (verifyEmail(formData.email)) setEmailError(false);
    else setEmailError(true);
  };

  // Handle GitHub
  const verifyGitHub = (gitHubString: string) => {
    const gitHubRegex = /^@[a-zA-Z0-9](?!.*--)[a-zA-Z0-9-]{0,37}[a-zA-Z0-9]$/;
    return gitHubRegex.test(gitHubString);
  };
  const handleGitHubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, gitHub: e.target.value });
    setGitHubError(false);
  };
  const handleGitHubBlur = () => {
    if (verifyGitHub(formData.gitHub)) setGitHubError(false);
    else setGitHubError(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate image
    if (!formData.image) setImageError(true);
    else setImageError(false);

    // Validate full name
    const isFullNameValid = verifyName(formData.name);
    setNameError(!isFullNameValid);

    // Validate email
    const isEmailValid = verifyEmail(formData.email);
    setEmailError(!isEmailValid);

    // Validate email
    const isGitHubValid = verifyGitHub(formData.gitHub);
    setGitHubError(!isGitHubValid);

    // If all fields are valid, proceed with form submission
    if (formData.image && isFullNameValid && isEmailValid && isGitHubValid) {
      const ticketNumber = String(Math.floor(Math.random() * 100000)).padStart(
        5,
        "0",
      );
      setFormData({ ...formData, ticketNumber: ticketNumber });
      navigate(ROUTES.TEST);
    }
  };

  return (
    <div className="pageContents">
      <img src={codingConf} className="pageLogo" />
      <div className="pageMainArea">
        <h1 className="pageHeader">
          Your Journey to Coding Conf 2026 Starts Here!
        </h1>
        <span className="pageNotice text-lg font-thin">
          Secure your spot at next year's biggest coding conference.
        </span>
        <form className="mainForm" onSubmit={handleSubmit}>
          <div className="labelBox">
            <label className="labelHeader text-xl">Upload Avatar</label>
            <FileUpload
              setImageError={setImageError}
              setFileRejected={setFileRejected}
            />
            {!(imageError || fileRejected) && (
              <InfoMessage message="Upload your photo (JPG or PNG, max size: 500KB)." />
            )}
            {(imageError || fileRejected) && (
              <ErrorMessage message="Please upload a single valid image (JPG or PNG, max size: 500KB)." />
            )}
          </div>
          <div className="labelBox">
            <label htmlFor="nameBox" className="labelHeader text-xl">
              Full Name
            </label>
            <input
              id="nameBox"
              type="text"
              value={formData.name}
              onBlur={handleNameBlur}
              onChange={handleNameChange}
              placeholder=""
              autoComplete="name"
            />
            {nameError && <ErrorMessage message="Please enter full name." />}
          </div>
          <div className="labelBox">
            <label htmlFor="emailBox" className="labelHeader text-xl">
              Email Address
            </label>
            <input
              id="emailBox"
              type="text"
              value={formData.email}
              onBlur={handleEmailBlur}
              onChange={handleEmailChange}
              placeholder="example@email.com"
              autoComplete="email"
            />
            {emailError && (
              <ErrorMessage message="Please enter a valid email address." />
            )}
          </div>
          <div className="labelBox">
            <label htmlFor="gitHubBox" className="labelHeader text-xl">
              GitHub Username
            </label>
            <input
              id="gitHubBox"
              type="text"
              value={formData.gitHub}
              onBlur={handleGitHubBlur}
              onChange={handleGitHubChange}
              placeholder="@yourusername"
              autoComplete="github"
            />
            {gitHubError && (
              <ErrorMessage message="Must be entered like @username." />
            )}
          </div>
          <button type="submit" className="submitButton">
            <span className="submitButtonText text-xl font-extrabold">Generate My Ticket</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
