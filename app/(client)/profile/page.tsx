'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Camera, Save, MapPin,LogOut } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, isAuthenticated, logout, updateProfile, isLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!user) return null;

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'addresses' as const, label: 'Addresses', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-black to-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      {user.name[0].toUpperCase()}
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full hover:bg-gray-800">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="font-bold text-gray-900 text-lg">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          disabled={!isEditing}
                          placeholder="Enter phone number"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    {/* Account Details */}
                    <div className="pt-6 border-t">
                      <h3 className="font-semibold text-gray-900 mb-4">Account Details</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Member Since</span>
                          <span className="font-medium">
                            {new Date(user.createdAt).toLocaleDateString('en-US', {
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Account Status</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                    <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                      Add New Address
                    </button>
                  </div>
                  <div className="text-center py-12">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No saved addresses yet</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}