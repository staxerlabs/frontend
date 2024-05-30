import React, { useEffect, useState } from "react";
import UnderDevelopmentTooltip from "../components/UnderDevTooltip";
import {
  UserCircle,
  PencilSimple,
  FloppyDiskBack,
  NavigationArrow,
  Fingerprint,
} from "@phosphor-icons/react";
import getUserData from "../utils/getUserData";
import getLocationFromId from "../utils/getLocationFromId";
import Form from "react-bootstrap/Form";
import "../styles/user-settings.css";

const UserSettings: React.FC = () => {
  const user_id = 1;
  const [editingField, setEditingField] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  // const [location_code, setLocationCode] = useState<number>("");
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data from database
        const userData: any = await getUserData(user_id);
        if (userData.length > 0) {
          const nicknameData = userData[0].nickname;
          const email = userData[0].email;
          const location_code = userData[0].home_state;
          const location = await getLocationFromId(location_code);
          setNickname(nicknameData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNicknameEdit = () => {
    setEditingField("nickname");
  };

  const handleEmailEdit = () => {
    setEditingField("email");
  };

  const handleLocationEdit = () => {
    // API call to get location from search
    setEditingField("location");
  };

  const handleSave = () => {
    // Call your updateUserData function here with the updated data
    // For demonstration, I'm just logging the updated data
    console.log("Updated data:", { nickname, email, location });
    setEditingField(null);
  };

  const fields = [
    { name: "Nickname", value: nickname, handler: handleNicknameEdit },
    { name: "Email", value: email, handler: handleEmailEdit },
    { name: "Location", value: location, handler: handleLocationEdit },
  ];

  const Icons = {
    FloppyDiskBack,
    NavigationArrow,
    Fingerprint,
  } as const;

  const permissionFields = [
    { name: "Enable offline mode", icon: "FloppyDiskBack", enabled: "False" },
    { name: "Enable geolocation", icon: "NavigationArrow", enabled: "False" },
    { name: "Biometric authentication", icon: "Fingerprint", enabled: "False" },
  ];

  return (
    <main>
      {/* Profile picture & name */}
      <div className="settings-profile-pic">
        <UserCircle size={84} />
        <h3 className="settings-nickname">
          {nickname}
          <PencilSimple
            className="edit-icon"
            onClick={handleNicknameEdit}
          />
        </h3>
        <p className="settings-nickname-upgrade">
          Upgrade to Pro <UnderDevelopmentTooltip />
        </p>
      </div>

      <h2>User settings</h2>
      {/* Info */}
      {fields.map((field) => (
        <div key={field.name} className="field-container">
          <div className="field">
            <span className="field-name">{field.name}:</span>
            <span className="field-value">{field.value}</span>
            <PencilSimple className="edit-icon" onClick={field.handler} />
          </div>

          {/* Edit info */}
          {editingField === field.name.toLowerCase() && (
            <div className="edit-menu">
              {/* Replace this with actual form elements for editing */}
              <span className="settings-edit-line">
                <input
                  type="text"
                  defaultValue={field.value}
                  onChange={(e) => {
                    switch (field.name) {
                      case "Nickname":
                        setNickname(e.target.value);
                        break;
                      case "Email":
                        setEmail(e.target.value);
                        break;
                      case "Location":
                        setLocation(e.target.value);
                        break;
                      default:
                        break;
                    }
                  }}
                />
                <button onClick={handleSave}>Save</button>
                <button
                  className="button-light"
                  onClick={() => setEditingField(null)}
                >
                  Cancel
                </button>
              </span>
            </div>
          )}
        </div>
      ))}

      {/* Permissions */}
      <h2>Permissions</h2>
      {permissionFields.map((field, index) => {
        const Icon = Icons[field.icon as keyof typeof Icons];

        if (!Icon) {
          console.error(`Icon not found: ${field.icon}`);
          return null;
        }

        return (
          <div key={field.name} className="settings-permission-row">
            {/* Mapping through the icons dynamically */}
            <Icon key={index} weight="fill" size={32} />
            <span className="field-name">{field.name}:</span>
            <Form>
              <Form.Switch id="custom-switch" disabled />
            </Form>
            <UnderDevelopmentTooltip />
          </div>
        );
      })}
    </main>
  );
};

export default UserSettings;
