import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Title, Paragraph, RadioButton, TextInput, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const ROServiceScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const section = route.params?.section || 'service';

  const [roType, setRoType] = useState('standard');
  const [serviceDate, setServiceDate] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleBookService = () => {
    navigation.navigate('Payment', { 
      service: 'RO Service', 
      price: '₹499',
      date: serviceDate,
      address: address
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {section === 'service' && (
          <>
            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.title}>RO Service & Maintenance</Title>
                <Paragraph style={styles.description}>
                  Our RO service includes filter replacement, cleaning, and performance optimization 
                  to ensure your water purifier delivers clean and safe drinking water.
                </Paragraph>

                <View style={styles.formSection}>
                  <Text style={styles.sectionTitle}>RO System Type</Text>
                  <RadioButton.Group onValueChange={value => setRoType(value)} value={roType}>
                    <View style={styles.radioOption}>
                      <RadioButton value="standard" color={'#7B1FA2'} />
                      <Text>Standard RO System</Text>
                    </View>
                    <View style={styles.radioOption}>
                      <RadioButton value="uv" color={'#7B1FA2'} />
                      <Text>RO+UV System</Text>
                    </View>
                    <View style={styles.radioOption}>
                      <RadioButton value="mineral" color={'#7B1FA2'} />
                      <Text>RO+UV+Mineralizer</Text>
                    </View>
                  </RadioButton.Group>
                </View>

                <View style={styles.formSection}>
                  <Text style={styles.sectionTitle}>Preferred Service Date</Text>
                  <TextInput
                    mode="outlined"
                    placeholder="DD/MM/YYYY"
                    value={serviceDate}
                    onChangeText={setServiceDate}
                    style={styles.input}
                  />
                </View>

                <View style={styles.formSection}>
                  <Text style={styles.sectionTitle}>Service Address</Text>
                  <TextInput
                    mode="outlined"
                    placeholder="Enter your full address"
                    value={address}
                    onChangeText={setAddress}
                    multiline
                    numberOfLines={3}
                    style={styles.input}
                  />
                </View>

                <View style={styles.formSection}>
                  <Text style={styles.sectionTitle}>Additional Notes</Text>
                  <TextInput
                    mode="outlined"
                    placeholder="Any specific issues or requirements"
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    numberOfLines={2}
                    style={styles.input}
                  />
                </View>
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button 
                  mode="contained" 
                  onPress={handleBookService}
                  style={[styles.button, { backgroundColor: '#7B1FA2' }]}
                >
                  Book Now - ₹499
                </Button>
              </Card.Actions>
            </Card>

            <Card style={styles.benefitsCard}>
              <Card.Content>
                <Title>Our RO Service Includes</Title>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• Sediment filter replacement</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• Carbon filter cleaning/replacement</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• Membrane inspection</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• UV lamp check (if applicable)</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• System sanitization</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• Performance testing</Text>
                </View>
              </Card.Content>
            </Card>
          </>
        )}

        {section === 'amc' && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>RO Annual Maintenance Contract</Title>
              <Paragraph style={styles.description}>
                Subscribe to our Annual Maintenance Contract for regular servicing and priority support 
                for your RO system. Keep your water purifier in optimal condition year-round.
              </Paragraph>

              <View style={styles.amcFeatures}>
                <Title style={styles.amcTitle}>AMC Benefits</Title>
                <View style={styles.amcFeature}>
                  <Text style={styles.amcFeatureText}>• 3 scheduled services per year</Text>
                </View>
                <View style={styles.amcFeature}>
                  <Text style={styles.amcFeatureText}>• Priority emergency support</Text>
                </View>
                <View style={styles.amcFeature}>
                  <Text style={styles.amcFeatureText}>• Free filter replacements (standard filters)</Text>
                </View>
                <View style={styles.amcFeature}>
                  <Text style={styles.amcFeatureText}>• 20% discount on parts not covered</Text>
                </View>
                <View style={styles.amcFeature}>
                  <Text style={styles.amcFeatureText}>• Water quality testing</Text>
                </View>
                <View style={styles.amcFeature}>
                  <Text style={styles.amcFeatureText}>• System performance optimization</Text>
                </View>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>RO System Type</Text>
                <RadioButton.Group onValueChange={value => setRoType(value)} value={roType}>
                  <View style={styles.radioOption}>
                    <RadioButton value="standard" color={'#7B1FA2'} />
                    <Text>Standard RO System</Text>
                  </View>
                  <View style={styles.radioOption}>
                    <RadioButton value="uv" color={'#7B1FA2'} />
                    <Text>RO+UV System</Text>
                  </View>
                  <View style={styles.radioOption}>
                    <RadioButton value="mineral" color={'#7B1FA2'} />
                    <Text>RO+UV+Mineralizer</Text>
                  </View>
                </RadioButton.Group>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Installation Address</Text>
                <TextInput
                  mode="outlined"
                  placeholder="Enter your full address"
                  value={address}
                  onChangeText={setAddress}
                  multiline
                  numberOfLines={3}
                  style={styles.input}
                />
              </View>

              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>RO Brand & Model</Text>
                <TextInput
                  mode="outlined"
                  placeholder="E.g., Kent, Pureit, etc."
                  value={notes}
                  onChangeText={setNotes}
                  style={styles.input}
                />
              </View>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('Payment', { service: 'RO AMC', price: '₹1,299' })}
                style={[styles.button, { backgroundColor: '#7B1FA2' }]}
              >
                Subscribe - ₹1,299/year
              </Button>
            </Card.Actions>
          </Card>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  formSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
  },
  cardActions: {
    justifyContent: 'center',
    paddingBottom: 15,
  },
  button: {
    width: '80%',
  },
  benefitsCard: {
    marginBottom: 30,
    elevation: 2,
  },
  benefitItem: {
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 16,
    lineHeight: 24,
  },
  amcFeatures: {
    marginVertical: 15,
    backgroundColor: '#F3E5F5',
    padding: 15,
    borderRadius: 8,
  },
  amcTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  amcFeature: {
    marginBottom: 8,
  },
  amcFeatureText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ROServiceScreen;
