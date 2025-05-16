import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from '@/components/ui/sonner';
import { Settings as SettingsIcon, Save, Shield } from "lucide-react";
import { useGetSocialMediaQuery, useUpdateSocialMediaMutation, useChangePasswordMutation } from '@/services/api/apiSlice';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Dr. Awosanya Yusuff - Author",
    siteDescription: "Official website of Dr. Awosanya Yusuff, author of Just Be Great Somehow and Vacua",
    contactEmail: "contact@example.com",
    phoneNumber: "+1 (234) 567-8901",
    address: "123 Book Street, Literary City, 12345"
  });

  const [socialSettings, setSocialSettings] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: ""
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("General settings saved successfully");
  };

  const { data: socialMediaData, isLoading: isSocialMediaLoading } = useGetSocialMediaQuery();
  const [updateSocialMedia, { isLoading: isUpdatingSocialMedia }] = useUpdateSocialMediaMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  useEffect(() => {
    if (socialMediaData) {
      setSocialSettings({
        facebook: socialMediaData.data.facebookUrl,
        twitter: socialMediaData.data.twitterUrl,
        instagram: socialMediaData.data.instagramUrl,
        linkedin: socialMediaData.data.linkedinUrl,
      });
    }
  }, [socialMediaData]);

  const saveSocialSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSocialMedia({
        facebookUrl: socialSettings.facebook,
        twitterUrl: socialSettings.twitter,
        instagramUrl: socialSettings.instagram,
        linkedinUrl: socialSettings.linkedin,
      }).unwrap();
      toast.success("Social media settings saved successfully");
    } catch (error) {
      toast.error("Failed to save social media settings");
    }
  };

  const saveSecuritySettings = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await changePassword({
        currentPassword: securitySettings.currentPassword,
        newPassword: securitySettings.newPassword,
        confirmNewPassword: securitySettings.confirmPassword,
      }).unwrap();
      
      toast.success("Password changed successfully");
      setSecuritySettings({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your website settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="mr-2 h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>
              Configure general website information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={saveGeneralSettings} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="siteName" className="text-sm font-medium">Site Name</label>
                <Input
                  id="siteName"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={handleGeneralChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="siteDescription" className="text-sm font-medium">Site Description</label>
                <Input
                  id="siteDescription"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="contactEmail" className="text-sm font-medium">Contact Email</label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={handleGeneralChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={generalSettings.phoneNumber}
                  onChange={handleGeneralChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">Address</label>
                <Input
                  id="address"
                  name="address"
                  value={generalSettings.address}
                  onChange={handleGeneralChange}
                />
              </div>
              
              <Button type="submit" className="mt-4">
                <Save size={18} className="mr-2" />
                Save General Settings
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>
                Manage your social media links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveSocialSettings} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="facebook" className="text-sm font-medium">Facebook URL</label>
                  <Input
                    id="facebook"
                    name="facebook"
                    value={socialSettings.facebook}
                    onChange={handleSocialChange}
                    placeholder="https://facebook.com/yourusername"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="twitter" className="text-sm font-medium">Twitter URL</label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={socialSettings.twitter}
                    onChange={handleSocialChange}
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="instagram" className="text-sm font-medium">Instagram URL</label>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={socialSettings.instagram}
                    onChange={handleSocialChange}
                    placeholder="https://instagram.com/yourusername"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="linkedin" className="text-sm font-medium">LinkedIn URL</label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={socialSettings.linkedin}
                    onChange={handleSocialChange}
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="mt-4"
                  disabled={isUpdatingSocialMedia}
                >
                  <Save size={18} className="mr-2" />
                  {isUpdatingSocialMedia ? "Saving..." : "Save Social Links"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Update your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveSecuritySettings} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="currentPassword" className="text-sm font-medium">Current Password</label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={securitySettings.currentPassword}
                    onChange={handleSecurityChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={securitySettings.newPassword}
                    onChange={handleSecurityChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={securitySettings.confirmPassword}
                    onChange={handleSecurityChange}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="mt-4"
                  disabled={isChangingPassword}
                >
                  <Save size={18} className="mr-2" />
                  {isChangingPassword ? "Changing Password..." : "Change Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
