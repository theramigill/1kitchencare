import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Title, Paragraph, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { getGradient } from '../theme';

const HomeScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Header with Logo */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>KitchenCare+</Text>
          <Text style={styles.headerSubtitle}>India's 1st kitchen protection service</Text>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Overview Section */}
        <Card style={styles.overviewCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Smart Kitchen Protection</Title>
            <Paragraph style={styles.cardParagraph}>
              KitchenCare+ offers smart, affordable protection plans for modular kitchens of any brand. 
              Covers wear & tear, water damage, hardware failure, insects, and accidental issues – 
              just like insurance, but smarter and paperless.
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Plans Section Preview */}
        <View style={styles.sectionHeader}>
          <Title style={styles.sectionTitle}>Protection Plans</Title>
          <TouchableOpacity onPress={() => navigation.navigate('PlansTab')}>
            <Text style={[styles.viewAll, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.plansScroll}>
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
                onPress={() => navigation.navigate('PlansTab')}
                style={[styles.button, { backgroundColor: colors.primary }]}
              >
                View Details
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
                <Text style={styles.featureText}>• Full alignment + cleaning</Text>
              </View>
              <View style={styles.planFeature}>
                <Text style={styles.featureText}>• Water damage care</Text>
              </View>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('PlansTab')}
                style={[styles.button, { backgroundColor: '#7B1FA2' }]}
              >
                View Details
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
              <Text style={styles.planPrice}>₹5000/year</Text>
            </LinearGradient>
            <Card.Content style={styles.planContent}>
              <View style={styles.planFeature}>
                <Text style={styles.featureText}>• Unlimited hinge/drawer fix</Text>
              </View>
              <View style={styles.planFeature}>
                <Text style={styles.featureText}>• Shutters repair</Text>
              </View>
              <View style={styles.planFeature}>
                <Text style={styles.featureText}>• 2 deep services</Text>
              </View>
              <View style={styles.planFeature}>
                <Text style={styles.featureText}>• Full water damage repair</Text>
              </View>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('PlansTab')}
                style={[styles.button, { backgroundColor: colors.secondary }]}
              >
                View Details
              </Button>
            </Card.Actions>
          </Card>
        </ScrollView>

        {/* Services Section Preview */}
        <View style={styles.sectionHeader}>
          <Title style={styles.sectionTitle}>Services</Title>
          <TouchableOpacity onPress={() => navigation.navigate('ServicesTab')}>
            <Text style={[styles.viewAll, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesGrid}>
          {/* Chimney Service */}
          <TouchableOpacity 
            style={styles.serviceCard}
            onPress={() => navigation.navigate('ChimneyService')}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              style={styles.serviceIcon}
            >
              {/* Icon placeholder */}
              <Text style={styles.serviceIconText}>🔧</Text>
            </LinearGradient>
            <Text style={styles.serviceTitle}>Chimney Service</Text>
            <Text style={styles.servicePrice}>₹500-800</Text>
          </TouchableOpacity>

          {/* Cooktop Service */}
          <TouchableOpacity 
            style={styles.serviceCard}
            onPress={() => navigation.navigate('CooktopService')}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              style={styles.serviceIcon}
            >
              {/* Icon placeholder */}
              <Text style={styles.serviceIconText}>🔥</Text>
            </LinearGradient>
            <Text style={styles.serviceTitle}>Cooktop Repair</Text>
            <Text style={styles.servicePrice}>₹500-1000</Text>
          </TouchableOpacity>

          {/* RO Service */}
          <TouchableOpacity 
            style={styles.serviceCard}
            onPress={() => navigation.navigate('ROService')}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              style={styles.serviceIcon}
            >
              {/* Icon placeholder */}
              <Text style={styles.serviceIconText}>💧</Text>
            </LinearGradient>
            <Text style={styles.serviceTitle}>RO Service</Text>
            <Text style={styles.servicePrice}>AMC Available</Text>
          </TouchableOpacity>

          {/* Kitchen Design */}
          <TouchableOpacity 
            style={styles.serviceCard}
            onPress={() => navigation.navigate('KitchenDesign')}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              style={styles.serviceIcon}
            >
              {/* Icon placeholder */}
              <Text style={styles.serviceIconText}>🏠</Text>
            </LinearGradient>
            <Text style={styles.serviceTitle}>Kitchen Design</Text>
            <Text style={styles.servicePrice}>₹1500 only</Text>
          </TouchableOpacity>
        </View>

        {/* Special Offer */}
        <Card style={styles.specialOfferCard}>
          <LinearGradient
            colors={[colors.secondary, '#FF9800']}
            style={styles.specialOfferHeader}
          >
            <Text style={styles.specialOfferTitle}>Special Offer</Text>
          </LinearGradient>
          <Card.Content>
            <Title>Want a New Kitchen?</Title>
            <Paragraph style={styles.cardParagraph}>
              Design your modular kitchen at just ₹1500 (deducted if you buy).
              One-time visit with full 3D planning and expert design.
            </Paragraph>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button 
              mode="contained" 
              onPress={() => navigation.navigate('KitchenDesign')}
              style={[styles.button, { backgroundColor: colors.secondary }]}
            >
              Book Now
            </Button>
          </Card.Actions>
        </Card>

        {/* Contact Info */}
        <Card style={styles.contactCard}>
          <Card.Content>
            <Title>Contact Us</Title>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Phone:</Text>
              <Text style={styles.contactValue}>8805900007 / 7402690001</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email:</Text>
              <Text style={styles.contactValue}>support@kitchencareplus.in</Text>
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
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
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
  overviewCard: {
    marginBottom: 20,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  cardParagraph: {
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 14,
  },
  plansScroll: {
    marginBottom: 20,
  },
  planCard: {
    width: 250,
    marginRight: 16,
    elevation: 3,
  },
  planCardHeader: {
    padding: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  planPrice: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  planContent: {
    paddingVertical: 10,
  },
  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
  },
  cardActions: {
    justifyContent: 'center',
    paddingBottom: 15,
  },
  button: {
    width: '80%',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceIconText: {
    fontSize: 24,
    color: 'white',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  servicePrice: {
    fontSize: 14,
    color: '#666',
  },
  specialOfferCard: {
    marginBottom: 20,
    elevation: 3,
  },
  specialOfferHeader: {
    padding: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  specialOfferTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  contactCard: {
    marginBottom: 30,
    elevation: 2,
  },
  contactItem: {
    flexDirection: 'row',
    marginTop: 10,
  },
  contactLabel: {
    fontWeight: 'bold',
    width: 60,
  },
  contactValue: {
    flex: 1,
  },
});

export default HomeScreen;
