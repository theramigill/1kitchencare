import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, Platform, Linking } from 'react-native';
import { Text, Card, Button, Title, Paragraph, TextInput, RadioButton, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';

type PaymentRouteParams = {
  service?: string;
  product?: string;
  planName?: string;
  price?: string;
  date?: string;
  address?: string;
};

const PaymentScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  
  const { 
    service, 
    product, 
    planName, 
    price, 
    date, 
    address 
  } = (route.params as PaymentRouteParams) || {};

  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  
  const razorpayKeyId = 'rzp_test_1DP5mmOlF5G5ag';

  const getItemTitle = () => {
    if (planName) return planName;
    if (service) return service;
    if (product) return product;
    return 'Item';
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    try {
      if (planName) {
        const planDetails = {
          name: planName,
          price: price,
          purchaseDate: new Date().toLocaleDateString(),
          expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString(),
          features: getPlanFeatures(planName),
          paymentId: paymentId
        };
        
        await AsyncStorage.setItem('userPlan', JSON.stringify(planDetails));
      }
      
      if (service) {
        const newService = {
          id: Date.now().toString(),
          type: service,
          date: date || new Date().toLocaleDateString(),
          status: 'Scheduled',
          technician: 'To be assigned',
          notes: `Service booked for ${address || 'your address'}`,
          paymentId: paymentId
        };
        
        const existingHistoryStr = await AsyncStorage.getItem('serviceHistory');
        const existingHistory = existingHistoryStr ? JSON.parse(existingHistoryStr) : [];
        
        const updatedHistory = [newService, ...existingHistory];
        await AsyncStorage.setItem('serviceHistory', JSON.stringify(updatedHistory));
      }
      
      Alert.alert(
        'Payment Successful',
        `Your payment of ${price} for ${getItemTitle()} has been processed successfully.`,
        [
          { 
            text: 'OK', 
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'HomeTab' }],
              });
            } 
          },
        ]
      );
    } catch (error) {
      console.error('Error saving payment details:', error);
      Alert.alert('Error', 'Payment was successful but there was an error saving your details. Please contact support.');
    }
  };

  const startRazorpayPayment = () => {
    const amountInPaise = parseFloat(price?.replace(/[^\d.]/g, '') || '0') * 100;
    
    const options = {
      description: `Payment for ${getItemTitle()}`,
      image: require('../../assets/logo.png'), // Local logo
      currency: 'INR',
      key: razorpayKeyId,
      amount: amountInPaise.toString(),
      name: 'KitchenCare+',
      prefill: {
        email: 'customer@example.com',
        contact: '9999999999',
        name: 'Customer Name'
      },
      theme: { color: '#1976D2' }
    };

    RazorpayCheckout.open(options)
      .then((data: { razorpay_payment_id: string }) => {
        handlePaymentSuccess(data.razorpay_payment_id);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error('Razorpay Error:', error);
        setLoading(false);
        
        let errorMessage = 'Payment failed. Please try again.';
        if (error.code === 'BAD_REQUEST_ERROR') {
          errorMessage = 'Transaction cancelled by user';
        }
        
        Alert.alert('Payment Failed', errorMessage);
      });
  };

  const handlePayment = async () => {
    setLoading(true);
    
    if (paymentMethod === 'razorpay') {
      startRazorpayPayment();
    } else {
      setTimeout(async () => {
        try {
          await handlePaymentSuccess('mock_payment_id_' + Date.now());
          setLoading(false);
        } catch (error) {
          console.error('Error processing payment:', error);
          setLoading(false);
          Alert.alert('Payment Failed', 'There was an error processing your payment. Please try again.');
        }
      }, 2000);
    }
  };

  const getPlanFeatures = (plan) => {
    switch (plan) {
      case 'Basic Plan':
        return [
          '2 service visits',
          'Lite alignment & cleaning',
          'General inspection & minor fix'
        ];
      case 'Advanced Plan':
        return [
          '1 detailed inspection',
          'Hinges change (up to 10)',
          'Drawer repair (up to 2)',
          'Full alignment + cleaning',
          'Water damage care',
          'Termite/Cockroach spray (1 time)'
        ];
      case 'Elite Plan (1 Year)':
      case 'Elite Plan (3 Years)':
        return [
          'Unlimited hinge/drawer fix',
          'Shutters repair (color-match best effort)',
          '2 deep services',
          '2 insecticide sprays',
          'Full water damage repair included',
          'Sink & area inspection',
          '50% off labor on pre-existing issues'
        ];
      default:
        return [];
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Title style={styles.summaryTitle}>Payment Summary</Title>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Item:</Text>
              <Text style={styles.summaryValue}>{getItemTitle()}</Text>
            </View>
            
            {date && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Date:</Text>
                <Text style={styles.summaryValue}>{date}</Text>
              </View>
            )}
            
            {address && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Address:</Text>
                <Text style={styles.summaryValue}>{address}</Text>
              </View>
            )}
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount:</Text>
              <Text style={styles.summaryValue}>{price}</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.paymentCard}>
          <Card.Content>
            <Title style={styles.paymentTitle}>Payment Method</Title>
            
            <RadioButton.Group onValueChange={value => setPaymentMethod(value)} value={paymentMethod}>
              <View style={styles.paymentOption}>
                <RadioButton value="razorpay" color={colors.primary} />
                <Text style={styles.paymentOptionText}>Pay Online (Razorpay)</Text>
              </View>
              
              <View style={styles.paymentOption}>
                <RadioButton value="card" color={colors.primary} />
                <Text style={styles.paymentOptionText}>Credit/Debit Card</Text>
              </View>
              
              <View style={styles.paymentOption}>
                <RadioButton value="upi" color={colors.primary} />
                <Text style={styles.paymentOptionText}>UPI</Text>
              </View>
              
              <View style={styles.paymentOption}>
                <RadioButton value="cod" color={colors.primary} />
                <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
              </View>
            </RadioButton.Group>

            {paymentMethod === 'card' && (
              <View style={styles.cardDetails}>
                <TextInput
                  label="Card Number"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  mode="outlined"
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="1234 5678 9012 3456"
                />
                
                <View style={styles.cardRow}>
                  <TextInput
                    label="Expiry Date"
                    value={cardExpiry}
                    onChangeText={setCardExpiry}
                    mode="outlined"
                    style={[styles.input, styles.cardRowInput]}
                    placeholder="MM/YY"
                  />
                  
                  <TextInput
                    label="CVV"
                    value={cardCvv}
                    onChangeText={setCardCvv}
                    mode="outlined"
                    style={[styles.input, styles.cardRowInput]}
                    keyboardType="numeric"
                    placeholder="123"
                    secureTextEntry
                  />
                </View>
                
                <TextInput
                  label="Name on Card"
                  value={cardName}
                  onChangeText={setCardName}
                  mode="outlined"
                  style={styles.input}
                  placeholder="John Doe"
                />
              </View>
            )}

            {paymentMethod === 'upi' && (
              <View style={styles.upiDetails}>
                <TextInput
                  label="UPI ID"
                  value={upiId}
                  onChangeText={setUpiId}
                  mode="outlined"
                  style={styles.input}
                  placeholder="yourname@upi"
                />
              </View>
            )}

            {paymentMethod === 'cod' && (
              <View style={styles.codDetails}>
                <Paragraph style={styles.codText}>
                  Pay in cash when our technician visits your location. 
                  A convenience fee of ₹50 will be added to your total.
                </Paragraph>
              </View>
            )}
          </Card.Content>
        </Card>

        <Card style={styles.securityCard}>
          <Card.Content>
            <Title style={styles.securityTitle}>Secure Payment</Title>
            <Paragraph style={styles.securityText}>
              Your payment information is encrypted and secure. We do not store your card details.
            </Paragraph>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handlePayment}
          style={[styles.payButton, { backgroundColor: colors.primary }]}
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay ${price}`}
        </Button>

        <Text style={styles.termsText}>
          By proceeding with the payment, you agree to our Terms of Service and Privacy Policy.
        </Text>
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
  summaryCard: {
    marginBottom: 20,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentCard: {
    marginBottom: 20,
    elevation: 2,
  },
  paymentTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentOptionText: {
    fontSize: 16,
    marginLeft: 8,
  },
  cardDetails: {
    marginTop: 15,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardRowInput: {
    flex: 1,
    marginRight: 10,
  },
  upiDetails: {
    marginTop: 15,
  },
  codDetails: {
    marginTop: 15,
  },
  codText: {
    fontSize: 14,
    lineHeight: 20,
  },
  securityCard: {
    marginBottom: 20,
    elevation: 2,
  },
  securityTitle: {
    fontSize: 18,
  },
  securityText: {
    fontSize: 14,
  },
  payButton: {
    marginBottom: 20,
    paddingVertical: 8,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default PaymentScreen;
