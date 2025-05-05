import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Title, Paragraph, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const PlansScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleSubscribe = (planName: string, price: string) => {
    navigation.navigate('Payment', { planName, price });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Protection Plans</Text>
        <Text style={styles.headerSubtitle}>Choose the right plan for your kitchen</Text>
      </View>

      <View style={styles.content}>
        {/* Basic Plan */}
        <Card style={styles.planCard}>
          <LinearGradient
            colors={[colors.primary, '#4B9FE1']}
            style={styles.planCardHeader}
          >
            <Text style={styles.planTitle}>Basic Plan</Text>
            <Text style={styles.planPrice}>₹1499/year</Text>
          </LinearGradient>
          <Card.Content style={styles.planContent}>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• 2 service visits</Text>
            </View>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• Lite alignment & cleaning</Text>
            </View>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• General inspection & minor fix</Text>
            </View>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button 
              mode="contained" 
              onPress={() => handleSubscribe('Basic Plan', '₹1499')}
              style={[styles.button, { backgroundColor: colors.primary }]}
            >
              Subscribe Now
            </Button>
          </Card.Actions>
        </Card>

        {/* Advanced Plan */}
        <Card style={styles.planCard}>
          <LinearGradient
            colors={['#7B1FA2', '#9C27B0']}
            style={styles.planCardHeader}
          >
            <Text style={styles.planTitle}>Advanced Plan</Text>
            <Text style={styles.planPrice}>₹2999/year</Text>
          </LinearGradient>
          <Card.Content style={styles.planContent}>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• 1 detailed inspection</Text>
            </View>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• Hinges change (up to 10)</Text>
            </View>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• Drawer repair (up to 2)</Text>
            </View>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• Full alignment + cleaning</Text>
            </View>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• Water damage care</Text>
            </View>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• Termite/Cockroach spray (1 time)</Text>
            </View>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button 
              mode="contained" 
              onPress={() => handleSubscribe('Advanced Plan', '₹2999')}
              style={[styles.button, { backgroundColor: '#7B1FA2' }]}
            >
              Subscribe Now
            </Button>
          </Card.Actions>
        </Card>

        {/* Elite Plan */}
        <Card style={styles.planCard}>
          <LinearGradient
            colors={[colors.secondary, '#F44336']}
            style={styles.planCardHeader}
          >
            <Text style={styles.planTitle}>Elite Plan</Text>
            <View style={styles.pricingOptions}>
              <Text style={styles.planPrice}>₹5000/year</Text>
              <Text style={styles.planPrice}>or</Text>
              <Text style={styles.planPrice}>₹9900/3 years</Text>
            </View>
          </LinearGradient>
          <Card.Content style={styles.planContent}>
            <Text style={styles.everythingIncluded}>Everything included:</Text>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• Unlimited hinge/drawer fix</Text>
            </View>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• Shutters repair (color-match best effort)</Text>
            </View>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• 2 deep services</Text>
            </View>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• 2 insecticide sprays</Text>
            </View>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• Full water damage repair included</Text>
            </View>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• Sink & area inspection</Text>
            </View>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• 50% off labor on pre-existing issues</Text>
            </View>
            <View style={styles.planFeature}>
              <Text style={styles.featureText}>• (Material cost separate)</Text>
            </View>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button 
              mode="contained" 
              onPress={() => handleSubscribe('Elite Plan (1 Year)', '₹5000')}
              style={[styles.button, { backgroundColor: colors.secondary, marginBottom: 10 }]}
            >
              1 Year - ₹5000
            </Button>
            <Button 
              mode="contained" 
              onPress={() => handleSubscribe('Elite Plan (3 Years)', '₹9900')}
              style={[styles.button, { backgroundColor: colors.secondary }]}
            >
              3 Years - ₹9900
            </Button>
          </Card.Actions>
        </Card>

        {/* Plan Comparison */}
        <Card style={styles.comparisonCard}>
          <Card.Content>
            <Title>Why Choose KitchenCare+?</Title>
            <Paragraph style={styles.comparisonText}>
              • Protection for any kitchen (even old ones){'\n'}
              • No paperwork, simple digital process{'\n'}
              • Trained technicians for all services{'\n'}
              • Genuine parts and quality materials{'\n'}
              • Scheduled maintenance to prevent issues{'\n'}
              • Emergency support for critical problems
            </Paragraph>
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
    backgroundColor: '#1976D2',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  content: {
    padding: 16,
  },
  planCard: {
    marginBottom: 20,
    elevation: 3,
  },
  planCardHeader: {
    padding: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  planTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  planPrice: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
  },
  pricingOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    maxWidth: 250,
  },
  planContent: {
    paddingVertical: 15,
  },
  everythingIncluded: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    lineHeight: 22,
  },
  cardActions: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    width: '80%',
  },
  comparisonCard: {
    marginBottom: 30,
    elevation: 2,
  },
  comparisonText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
});

export default PlansScreen;
