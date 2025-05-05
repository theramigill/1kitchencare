import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Title, Paragraph, RadioButton, TextInput, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChimneyServiceScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const section = route.params?.section || 'service';

  const [chimneyType, setChimneyType] = useState('standard');
  const [serviceDate, setServiceDate] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleBookService = () => {
    navigation.navigate('Payment', { 
      service: 'Chimney Service', 
      price: chimneyType === 'standard' ? '₹500' : '₹800',
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
                <Title style={styles.title}>Book Chimney Service</Title>
                <Paragraph style={styles.description}>
                  Our professional chimney service includes deep cleaning, filter replacement, 
                  motor check, and performance optimization to ensure your chimney works efficiently.
                </Paragraph>

                <View style={styles.formSection}>
                  <Text style={styles.sectionTitle}>Chimney Type</Text>
                  <RadioButton.Group onValueChange={value => setChimneyType(value)} value={chimneyType}>
                    <View style={styles.radioOption}>
                      <RadioButton value="standard" color={colors.primary} />
                      <Text>Standard Chimney (₹500)</Text>
                    </View>
                    <View style={styles.radioOption}>
                      <RadioButton value="premium" color={colors.primary} />
                      <Text>Premium/Auto-Clean Chimney (₹800)</Text>
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
                    placeholder="Any specific requirements or issues"
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
                  style={[styles.button, { backgroundColor: colors.primary }]}
                >
                  Book Now - {chimneyType === 'standard' ? '₹500' : '₹800'}
                </Button>
              </Card.Actions>
            </Card>

            <Card style={styles.benefitsCard}>
              <Card.Content>
                <Title>Benefits of Regular Chimney Service</Title>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• Improved suction and performance</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• Reduced noise and vibration</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• Prevention of oil and grease buildup</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• Extended chimney lifespan</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitText}>• Healthier kitchen environment</Text>
                </View>
              </Card.Content>
            </Card>
          </>
        )}

        {section === 'buy' && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Buy New Chimney</Title>
              <Paragraph style={styles.description}>
                Explore our range of high-quality chimneys with professional installation.
                Our experts will help you choose the right model for your kitchen.
              </Paragraph>

              <View style={styles.productList}>
                <Card style={styles.productCard}>
                  <Card.Content>
                    <Title style={styles.productTitle}>Standard Wall-Mounted</Title>
                    <Paragraph>60cm, 1000 m³/hr suction</Paragraph>
                    <Text style={styles.productPrice}>₹5,999</Text>
                  </Card.Content>
                  <Card.Actions style={styles.productActions}>
                    <Button mode="contained" onPress={() => navigation.navigate('Payment', { product: 'Standard Chimney', price: '₹5,999' })}>
                      Buy Now
                    </Button>
                  </Card.Actions>
                </Card>

                <Card style={styles.productCard}>
                  <Card.Content>
                    <Title style={styles.productTitle}>Premium Auto-Clean</Title>
                    <Paragraph>90cm, 1500 m³/hr suction</Paragraph>
                    <Text style={styles.productPrice}>₹12,999</Text>
                  </Card.Content>
                  <Card.Actions style={styles.productActions}>
                    <Button mode="contained" onPress={() => navigation.navigate('Payment', { product: 'Premium Chimney', price: '₹12,999' })}>
                      Buy Now
                    </Button>
                  </Card.Actions>
                </Card>

                <Card style={styles.productCard}>
                  <Card.Content>
                    <Title style={styles.productTitle}>Island Kitchen Chimney</Title>
                    <Paragraph>120cm, 2000 m³/hr suction</Paragraph>
                    <Text style={styles.productPrice}>₹24,999</Text>
                  </Card.Content>
                  <Card.Actions style={styles.productActions}>
                    <Button mode="contained" onPress={() => navigation.navigate('Payment', { product: 'Island Chimney', price: '₹24,999' })}>
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

        {section === 'inspect' && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Chimney Inspection</Title>
              <Paragraph style={styles.description}>
                Our technician will thoroughly inspect your chimney, identify any issues,
                and recommend necessary repairs or maintenance.
              </Paragraph>

              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Preferred Inspection Date</Text>
                <TextInput
                  mode="outlined"
                  placeholder="DD/MM/YYYY"
                  value={serviceDate}
                  onChangeText={setServiceDate}
                  style={styles.input}
                />
              </View>

              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Inspection Address</Text>
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
                <Text style={styles.sectionTitle}>Chimney Issues</Text>
                <TextInput
                  mode="outlined"
                  placeholder="Describe any issues you're experiencing"
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
                onPress={() => navigation.navigate('Payment', { service: 'Chimney Inspection', price: '₹299' })}
                style={[styles.button, { backgroundColor: colors.primary }]}
              >
                Book Inspection - ₹299
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

export default ChimneyServiceScreen;
