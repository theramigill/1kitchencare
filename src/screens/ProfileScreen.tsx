import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, Linking } from 'react-native';
import { Text, Card, Button, Title, Paragraph, Avatar, List, Divider, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import { useAuth } from '../services/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('');
  const [userPlan, setUserPlan] = useState(null);
  const [kitchenPhotos, setKitchenPhotos] = useState([]);
  const [serviceHistory, setServiceHistory] = useState([]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        if (user) {
          setUserEmail(user.email || '');
          
          const storedName = await AsyncStorage.getItem('userName');
          if (storedName) {
            setUserName(storedName);
          }
          
          const storedPlan = await AsyncStorage.getItem('userPlan');
          if (storedPlan) {
            setUserPlan(JSON.parse(storedPlan));
          }
          
          const storedPhotos = await AsyncStorage.getItem('kitchenPhotos');
          if (storedPhotos) {
            setKitchenPhotos(JSON.parse(storedPhotos));
          }
          
          const storedHistory = await AsyncStorage.getItem('serviceHistory');
          if (storedHistory) {
            setServiceHistory(JSON.parse(storedHistory));
          } else {
            const sampleHistory = [
              {
                id: '1',
                type: 'Chimney Service',
                date: '15 Apr 2025',
                status: 'Completed',
                technician: 'Rajesh K.',
                notes: 'Cleaned filters and checked motor performance'
              },
              {
                id: '2',
                type: 'Kitchen Inspection',
                date: '02 Mar 2025',
                status: 'Completed',
                technician: 'Sunil P.',
                notes: 'General inspection and minor hinge adjustments'
              }
            ];
            setServiceHistory(sampleHistory);
            await AsyncStorage.setItem('serviceHistory', JSON.stringify(sampleHistory));
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, [user]);

  const handleAddPhoto = async () => {
    try {
      const newPhoto = { id: Date.now().toString(), uri: 'photo_placeholder' };
      const updatedPhotos = [...kitchenPhotos, newPhoto];
      setKitchenPhotos(updatedPhotos);
      
      await AsyncStorage.setItem('kitchenPhotos', JSON.stringify(updatedPhotos));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      const updatedPhotos = kitchenPhotos.filter(photo => photo.id !== photoId);
      setKitchenPhotos(updatedPhotos);
      
      await AsyncStorage.setItem('kitchenPhotos', JSON.stringify(updatedPhotos));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Avatar.Text 
          size={80} 
          label={userName.substring(0, 2).toUpperCase()} 
          style={styles.avatar} 
          color="white"
          backgroundColor={colors.secondary}
        />
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>

      <View style={styles.content}>
        {/* Current Plan */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Your Plan</Title>
            {userPlan ? (
              <>
                <View style={styles.planInfo}>
                  <Text style={styles.planName}>{userPlan.name}</Text>
                  <Text style={styles.planPrice}>{userPlan.price}</Text>
                </View>
                <Text style={styles.planExpiry}>Valid until: {userPlan.expiryDate}</Text>
                <View style={styles.planFeatures}>
                  {userPlan.features.map((feature, index) => (
                    <View key={index} style={styles.planFeature}>
                      <Text style={styles.featureText}>• {feature}</Text>
                    </View>
                  ))}
                </View>
                <Button 
                  mode="contained" 
                  onPress={() => navigation.navigate('PlansTab')}
                  style={[styles.button, { backgroundColor: colors.primary }]}
                >
                  Manage Plan
                </Button>
              </>
            ) : (
              <>
                <Paragraph style={styles.noPlanText}>
                  You don't have an active protection plan. Subscribe to a plan to protect your kitchen.
                </Paragraph>
                <Button 
                  mode="contained" 
                  onPress={() => navigation.navigate('PlansTab')}
                  style={[styles.button, { backgroundColor: colors.primary }]}
                >
                  View Plans
                </Button>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Kitchen Photos */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Kitchen Photos</Title>
            <Paragraph style={styles.photoDescription}>
              Upload photos of your kitchen to help our technicians better understand your setup
            </Paragraph>
            
            <View style={styles.photoGrid}>
              {kitchenPhotos.map((photo, index) => (
                <View key={index} style={styles.photoContainer}>
                  <View style={styles.photoPlaceholder}>
                    <Text>Photo {index + 1}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => handleDeletePhoto(photo.id)}
                  >
                    <Text style={styles.deleteButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
              
              <TouchableOpacity 
                style={styles.addPhotoButton}
                onPress={handleAddPhoto}
              >
                <Text style={styles.addPhotoButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Service History */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Service History</Title>
            
            {serviceHistory.length > 0 ? (
              <List.Section>
                {serviceHistory.map((service, index) => (
                  <React.Fragment key={service.id}>
                    <List.Item
                      title={service.type}
                      description={`Date: ${service.date} • Status: ${service.status}`}
                      left={props => <List.Icon {...props} icon="history" />}
                      onPress={() => Alert.alert(
                        service.type,
                        `Date: ${service.date}\nStatus: ${service.status}\nTechnician: ${service.technician}\nNotes: ${service.notes}`
                      )}
                    />
                    {index < serviceHistory.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List.Section>
            ) : (
              <Paragraph style={styles.noHistoryText}>
                You don't have any service history yet.
              </Paragraph>
            )}
          </Card.Content>
        </Card>

        {/* Account Settings */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Account Settings</Title>
            
            <List.Item
              title="Edit Profile"
              left={props => <List.Icon {...props} icon="account-edit" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
            <Divider />
            <List.Item
              title="Notifications"
              left={props => <List.Icon {...props} icon="bell" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
            <Divider />
            <List.Item
              title="Payment Methods"
              left={props => <List.Icon {...props} icon="credit-card" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
            <Divider />
            <List.Item
              title="Help & Support"
              left={props => <List.Icon {...props} icon="help-circle" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {
                Linking.openURL('mailto:support@kitchencareplus.in?subject=KitchenCare%2B%20Support');
              }}
            />
            <Divider />
            <List.Item
              title="Terms & Conditions"
              left={props => <List.Icon {...props} icon="file-document" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => Alert.alert(
                'Terms & Conditions',
                'KitchenCare+ Terms and Conditions\n\nThese terms and conditions outline the rules and regulations for the use of KitchenCare+ services.\n\nBy using our services, you agree to these terms and conditions.'
              )}
            />
            <Divider />
            <List.Item
              title="Privacy Policy"
              left={props => <List.Icon {...props} icon="shield-account" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => Alert.alert(
                'Privacy Policy',
                'KitchenCare+ Privacy Policy\n\nYour privacy is important to us. It is KitchenCare+ policy to respect your privacy regarding any information we may collect from you through our app.\n\nWe only ask for personal information when we truly need it to provide a service to you.'
              )}
            />
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <Button 
          mode="outlined" 
          onPress={handleLogout}
          style={styles.logoutButton}
          icon="logout"
        >
          Logout
        </Button>

        {/* Contact Info */}
        <Card style={styles.contactCard}>
          <Card.Content>
            <Title style={styles.contactTitle}>Contact Us</Title>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Phone:</Text>
              <Text style={styles.contactValue}>8805900007 / 7402690001</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email:</Text>
              <Text style={styles.contactValue}>support@kitchencareplus.in</Text>
            </View>
            <Button 
              mode="contained" 
              icon="email"
              onPress={() => Linking.openURL('mailto:support@kitchencareplus.in?subject=KitchenCare%2B%20Support')}
              style={[styles.contactButton, { backgroundColor: '#1976D2' }]}
            >
              Contact Support
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 20,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  planInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  planExpiry: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  planFeatures: {
    marginBottom: 20,
  },
  planFeature: {
    marginBottom: 5,
  },
  featureText: {
    fontSize: 14,
  },
  noPlanText: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
  photoDescription: {
    marginBottom: 15,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photoContainer: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#D32F2F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#999',
  },
  addPhotoButtonText: {
    fontSize: 24,
    color: '#999',
  },
  noHistoryText: {
    marginVertical: 15,
  },
  logoutButton: {
    marginBottom: 20,
  },
  contactCard: {
    marginBottom: 30,
  },
  contactTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    marginTop: 5,
  },
  contactLabel: {
    fontWeight: 'bold',
    width: 60,
  },
  contactValue: {
    flex: 1,
  },
  contactButton: {
    marginTop: 15,
  },
});

export default ProfileScreen;
