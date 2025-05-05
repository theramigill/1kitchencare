import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Title, Paragraph, RadioButton, TextInput, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const CooktopServiceScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const section = route.params?.section || 'repair';

  const [serviceType, setServiceType] = useState('basic');
  const [serviceDate, setServiceDate] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleBookService = () => {
    navigation.navigate('Payment', { 
      service: 'Cooktop Repair', 
      price: serviceType === 'basic' ? '₹500' : '₹1000',
      date: serviceDate,
      address: address
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {section === 'repair' && (
          <>
            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.title}>Hob/Cooktop Repair</Title>
                <Paragraph style={styles.description}>
                  Our expert technicians can fix ignition issues, gas leaks, and other common problems 
                  with your cooktop or hob. We provide reliable and efficient repair services.
                </Paragraph>

                <View style={styles.formSection}>
                  <Text style={styles.sectionTitle}>Repair Type</Text>
                  <RadioButton.Group onValueChange={value => setServiceType(value)} value={serviceType}>
                    <View style={styles.radioOption}>
                      <RadioButton value="basic" color={colors.secondary} />
                      <Text>Basic Repair (Ignition/Knob Issues) - ₹500</Text>
                    </View>
                    <View style={styles.radioOption}>
                      <RadioButton value="advanced" color={colors.secondary} />
                      <Text>Advanced Repair (Gas/Burner Issues) - ₹1000</Text>
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
                  <Text style={styles.sectionTitle}>Issue Description</Text>
                  <TextInput
                    mode="outlined"
                    placeholder="Describe the issue with your cooktop"
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
                  style={[styles.button, { backgroundColor: colors.secondary }]}
                >
                  Book Now - {serviceType === 'basic' ? '₹500' : '₹1000'}
                </Button>
              </Card.Actions>
            </Card>

            <Card style={styles.benefitsCard}>
              <Card.Content>
                <Title>Our Cooktop Repair Services Include</Title>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• Ignition system repair</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• Gas leak detection and fixing</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• Burner cleaning and adjustment</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• Knob and control panel repair</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• Performance optimization</Text>
                </View>
              </Card.Content>
            </Card>
          </>
        )}

        {section === 'parts' && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Pipe/Burner Replacement</Title>
              <Paragraph style={styles.description}>
                We offer on-site replacement of pipes, burners, and knobs for your cooktop.
                Our technicians carry genuine parts for most popular brands.
              </Paragraph>

              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Replacement Parts Needed</Text>
                <RadioButton.Group onValueChange={value => setServiceType(value)} value={serviceType}>
                  <View style={styles.radioOption}>
                    <RadioButton value="burner" color={colors.secondary} />
                    <Text>Burner Replacement</Text>
                  </View>
                  <View style={styles.radioOption}>
                    <RadioButton value="pipe" color={colors.secondary} />
                    <Text>Gas Pipe Replacement</Text>
                  </View>
                  <View style={styles.radioOption}>
                    <RadioButton value="knob" color={colors.secondary} />
                    <Text>Knob Replacement</Text>
                  </View>
                  <View style={styles.radioOption}>
                    <RadioButton value="multiple" color={colors.secondary} />
                    <Text>Multiple Parts</Text>
                  </View>
                </RadioButton.Group>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Cooktop Brand & Model</Text>
                <TextInput
                  mode="outlined"
                  placeholder="E.g., Prestige, Elica, etc."
                  value={notes}
                  onChangeText={setNotes}
                  style={styles.input}
                />
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
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('Payment', { service: 'Parts Replacement', price: 'Parts + ₹300' })}
                style={[styles.button, { backgroundColor: colors.secondary }]}
              >
                Book Service - Parts + ₹300 labor
              </Button>
            </Card.Actions>
          </Card>
        )}

        {section === 'buy' && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Buy New Hob/Cooktop</Title>
              <Paragraph style={styles.description}>
                Browse our collection of modern cooktops with professional installation.
                We offer a range of options to suit your kitchen needs.
              </Paragraph>

              <View style={styles.productList}>
                <Card style={styles.productCard}>
                  <Card.Content>
                    <Title style={styles.productTitle}>2-Burner Glass Cooktop</Title>
                    <Paragraph>Compact design, auto-ignition</Paragraph>
                    <Text style={styles.productPrice}>₹3,499</Text>
                  </Card.Content>
                  <Card.Actions style={styles.productActions}>
                    <Button 
                      mode="contained" 
                      onPress={() => navigation.navigate('Payment', { product: '2-Burner Cooktop', price: '₹3,499' })}
                      style={{ backgroundColor: colors.secondary }}
                    >
                      Buy Now
                    </Button>
                  </Card.Actions>
                </Card>

                <Card style={styles.productCard}>
                  <Card.Content>
                    <Title style={styles.productTitle}>4-Burner Premium Hob</Title>
                    <Paragraph>Stainless steel, high-efficiency burners</Paragraph>
                    <Text style={styles.productPrice}>₹7,999</Text>
                  </Card.Content>
                  <Card.Actions style={styles.productActions}>
                    <Button 
                      mode="contained" 
                      onPress={() => navigation.navigate('Payment', { product: '4-Burner Hob', price: '₹7,999' })}
                      style={{ backgroundColor: colors.secondary }}
                    >
                      Buy Now
                    </Button>
                  </Card.Actions>
                </Card>

                <Card style={styles.productCard}>
                  <Card.Content>
                    <Title style={styles.productTitle}>5-Burner Luxury Hob</Title>
                    <Paragraph>Tempered glass, cast iron supports</Paragraph>
                    <Text style={styles.productPrice}>₹12,999</Text>
                  </Card.Content>
                  <Card.Actions style={styles.productActions}>
                    <Button 
                      mode="contained" 
                      onPress={() => navigation.navigate('Payment', { product: '5-Burner Luxury Hob', price: '₹12,999' })}
                      style={{ backgroundColor: colors.secondary }}
                    >
                      Buy Now
                    </Button>
                  </Card.Actions>
                </Card>
              </View>

              <Button 
                mode="outlined" 
                onPress={() => navigation.navigate('ServicesTab')}
                style={styles.backButton}
              >
                Back to Services
              </Button>
            </Card.Content>
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
  productList: {
    marginVertical: 20,
  },
  productCard: {
    marginBottom: 15,
    elevation: 2,
  },
  productTitle: {
    fontSize: 18,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#D32F2F',
  },
  productActions: {
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingRight: 10,
  },
  backButton: {
    marginTop: 10,
  },
});

export default CooktopServiceScreen;
