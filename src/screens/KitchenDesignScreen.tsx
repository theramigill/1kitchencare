import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Alert, Platform } from 'react-native';
import { Text, Card, Button, Title, Paragraph, TextInput, useTheme, Divider, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';

type RootStackParamList = {
  Payment: {
    service: string;
    price: string;
    name: string;
    phone: string;
    email: string;
    address: string;
  };
};

type KitchenDesignScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;

type PhotoType = {
  uri: string;
  name?: string;
  type?: string;
};

const KitchenDesignScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<KitchenDesignScreenNavigationProp>();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [kitchenSize, setKitchenSize] = useState('');
  const [requirements, setRequirements] = useState('');
  const [kitchenPhotos, setKitchenPhotos] = useState<PhotoType[]>([]);
  
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState('');

  const handlePickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 5,
        includeBase64: false,
        maxHeight: 1200,
        maxWidth: 1200,
      });
      
      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        Alert.alert('Error', 'Failed to pick image: ' + result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        const newPhotos = result.assets.map(asset => ({
          uri: asset.uri || '',
          name: asset.fileName,
          type: asset.type
        }));
        
        setKitchenPhotos([...kitchenPhotos, ...newPhotos]);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to pick image');
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    if (!phone.trim()) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!/^\d{10}$/.test(phone.trim())) {
      setPhoneError('Please enter a valid 10-digit phone number');
      isValid = false;
    } else {
      setPhoneError('');
    }
    
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    if (!address.trim()) {
      setAddressError('Address is required');
      isValid = false;
    } else {
      setAddressError('');
    }
    
    return isValid;
  };

  const handleBookDesign = () => {
    if (validateForm()) {
      navigation.navigate('Payment', { 
        service: 'Kitchen Design Session', 
        price: '₹1500',
        name,
        phone,
        email,
        address
      });
    } else {
      Alert.alert('Form Error', 'Please fill in all required fields correctly');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Design Your Dream Kitchen</Text>
        <Text style={styles.headerSubtitle}>Professional design at just ₹1500</Text>
        <Text style={styles.headerNote}>(Amount deducted if you proceed with purchase)</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Kitchen Design Consultation</Title>
            <Paragraph style={styles.description}>
              Our expert designers will visit your home, understand your requirements, 
              and create a detailed 3D plan for your dream modular kitchen. The consultation 
              fee is fully deductible from your kitchen purchase.
            </Paragraph>

            <View style={styles.designProcess}>
              <Title style={styles.processTitle}>Our Design Process</Title>
              
              <View style={styles.processStep}>
                <View style={[styles.stepNumber, { backgroundColor: colors.secondary }]}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Initial Consultation</Text>
                  <Text style={styles.stepDescription}>
                    Our designer visits your home to understand your requirements and take measurements
                  </Text>
                </View>
              </View>
              
              <View style={styles.processStep}>
                <View style={[styles.stepNumber, { backgroundColor: colors.secondary }]}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Design Creation</Text>
                  <Text style={styles.stepDescription}>
                    We create detailed 3D designs based on your requirements and space
                  </Text>
                </View>
              </View>
              
              <View style={styles.processStep}>
                <View style={[styles.stepNumber, { backgroundColor: colors.secondary }]}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Design Presentation</Text>
                  <Text style={styles.stepDescription}>
                    We present the designs and make adjustments based on your feedback
                  </Text>
                </View>
              </View>
              
              <View style={styles.processStep}>
                <View style={[styles.stepNumber, { backgroundColor: colors.secondary }]}>
                  <Text style={styles.stepNumberText}>4</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Final Quotation</Text>
                  <Text style={styles.stepDescription}>
                    We provide a detailed quotation for your kitchen with material specifications
                  </Text>
                </View>
              </View>
            </View>

            <Divider style={styles.divider} />

            <Title style={styles.formTitle}>Book Your Design Session</Title>
            
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              
              <TextInput
                mode="outlined"
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                style={styles.input}
                error={!!nameError}
              />
              {nameError ? <HelperText type="error">{nameError}</HelperText> : null}
              
              <TextInput
                mode="outlined"
                label="Phone Number"
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={styles.input}
                error={!!phoneError}
              />
              {phoneError ? <HelperText type="error">{phoneError}</HelperText> : null}
              
              <TextInput
                mode="outlined"
                label="Email"
                placeholder="Enter your email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
                error={!!emailError}
              />
              {emailError ? <HelperText type="error">{emailError}</HelperText> : null}
            </View>

            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Kitchen Details</Text>
              
              <TextInput
                mode="outlined"
                label="Address"
                placeholder="Enter your full address"
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={3}
                style={styles.input}
                error={!!addressError}
              />
              {addressError ? <HelperText type="error">{addressError}</HelperText> : null}
              
              <TextInput
                mode="outlined"
                label="Kitchen Size (approx. in sq. ft.)"
                placeholder="E.g., 100 sq. ft."
                value={kitchenSize}
                onChangeText={setKitchenSize}
                keyboardType="numeric"
                style={styles.input}
              />
              
              <TextInput
                mode="outlined"
                label="Requirements & Preferences"
                placeholder="Describe your dream kitchen, preferences for materials, colors, etc."
                value={requirements}
                onChangeText={setRequirements}
                multiline
                numberOfLines={4}
                style={styles.input}
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Upload Current Kitchen Photos (Optional)</Text>
              <Text style={styles.photoHelp}>
                Photos of your current kitchen will help our designers better understand your space
              </Text>
              
              <View style={styles.photoSection}>
                {kitchenPhotos.map((photo, index) => (
                  <View key={index} style={styles.photoContainer}>
                    <Image 
                      source={{ uri: photo.uri }} 
                      style={styles.photoThumbnail} 
                      resizeMode="cover"
                    />
                    <Text style={styles.photoLabel}>Photo {index + 1}</Text>
                  </View>
                ))}
                
                <Button 
                  mode="contained" 
                  onPress={handlePickImages}
                  style={styles.photoButton}
                  icon="camera"
                  color={colors.primary}
                >
                  Upload Kitchen Photos
                </Button>
              </View>
            </View>
          </Card.Content>
          
          <Card.Actions style={styles.cardActions}>
            <Button 
              mode="contained" 
              onPress={handleBookDesign}
              style={[styles.button, { backgroundColor: colors.secondary }]}
            >
              Book Design Session - ₹1500
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.testimonialCard}>
          <Card.Content>
            <Title>What Our Customers Say</Title>
            
            <View style={styles.testimonial}>
              <Text style={styles.testimonialText}>
                "The design team was very professional and understood exactly what I wanted. 
                The 3D design helped me visualize my kitchen before making any commitments."
              </Text>
              <Text style={styles.testimonialAuthor}>- Priya S., Delhi</Text>
            </View>
            
            <View style={styles.testimonial}>
              <Text style={styles.testimonialText}>
                "I was amazed by the attention to detail. The designer suggested space-saving 
                solutions I hadn't even considered. Very happy with my new kitchen!"
              </Text>
              <Text style={styles.testimonialAuthor}>- Rahul M., Mumbai</Text>
            </View>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
  },
  headerNote: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    marginTop: 5,
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 20,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  designProcess: {
    marginVertical: 15,
  },
  processTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  processStep: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 2,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    marginVertical: 20,
  },
  formTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  formSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  photoHelp: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  photoSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  photoContainer: {
    width: 100,
    height: 120,
    marginRight: 10,
    marginBottom: 15,
    borderRadius: 4,
    overflow: 'hidden',
  },
  photoThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  photoLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  photoButton: {
    marginTop: 10,
    width: '100%',
  },
  cardActions: {
    justifyContent: 'center',
    paddingBottom: 15,
  },
  button: {
    width: '80%',
  },
  testimonialCard: {
    marginBottom: 30,
    elevation: 2,
  },
  testimonial: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
  },
  testimonialText: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 8,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default KitchenDesignScreen;
