import React, { useEffect, useState } from 'react';
import UnderDevelopmentTooltip from '../components/UnderDevTooltip';
import { UserCircle, PencilSimple, FloppyDiskBack, NavigationArrow, Fingerprint } from '@phosphor-icons/react';
import getUserData from '../utils/getUserData';
import Form from 'react-bootstrap/Form';
import '../styles/user-settings.css'

const UserSettings: React.FC = () => {
    const user_id = 1;
    const [editingField, setEditingField] = useState<string | null>(null);
    const [nickname, setNickname] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data from database
                const userData = await getUserData(user_id);
                if (userData.length > 0) {
                    const nicknameData = userData[0].nickname;
                    setNickname(nicknameData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchData();
    }, []);

    const fields = [
        { name: "nickname", value: nickname},
        { name: 'Email', value: 'user@example.com' },
        { name: 'Phone', value: '(123) 456-7890' },
        { name: 'Location', value: '123 Main St, Anytown, USA' },
    ];

    const handleEditClick = (fieldName: string) => {
        setEditingField(editingField === fieldName ? null : fieldName);
    };

    const Icons = {
        FloppyDiskBack,
        NavigationArrow,
        Fingerprint
      } as const;
      

    const permissionFields = [
        { name: 'Enable offline mode', icon: 'FloppyDiskBack', enabled: 'False' },
        { name: 'Enable geolocation', icon: 'NavigationArrow', enabled: 'False' },
        { name: 'Biometric authentication', icon: 'Fingerprint', enabled: 'False' },
    ];


    return (
        <main>   
            {/* Profile picture & name */}       
            <div className='settings-profile-pic'>
            <UserCircle size={84} />
            <h3 className='settings-nickname'>{nickname}
                <PencilSimple className="edit-icon" onClick={() => handleEditClick(nickname)} />
            </h3>
            <p className='settings-nickname-upgrade'>Upgrade to Pro <UnderDevelopmentTooltip/></p>
            

            </div>
            
           
            <h2>User settings</h2>
            {/* Info */}
            {fields.map((field) => (
                <div key={field.name} className="field-container">
                    <div className="field">
                        <span className="field-name">{field.name}:</span>
                        <span className="field-value">{field.value}</span>
                        <PencilSimple className="edit-icon" onClick={() => handleEditClick(field.name)} />
                    </div>

                    {/* Edit info */}
                    {editingField === field.name && (
                        <div className="edit-menu">
                            {/* Replace this with actual form elements for editing */}
                            <span className='settings-edit-line'>
                                <input type="text" defaultValue={field.value} />
                                <button>Save</button>
                                <button className='button-light' onClick={() => setEditingField(null)}>Cancel</button>
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
                    return null
                }
                
                return (
                <div key={field.name} className="settings-permission-row">
                        {/* Mapping through the icons dynamically */}
                        <Icon key={index} weight='fill' size={32}/>
                        <span className="field-name">{field.name}:</span>
                        <Form>
                            <Form.Switch
                            id="custom-switch"
                            disabled
                            />
                        </Form>
                        <UnderDevelopmentTooltip/>
                    
                </div>
            )})}
        </main>
    );
};

export default UserSettings;
