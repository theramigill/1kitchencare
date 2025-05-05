import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Title, Paragraph, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ServicesScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kitchen Services</Text>
        <Text style={styles.headerSubtitle}>Professional care for your kitchen</Text>
      </View>

      <View style={styles.content}>
        {/* Chimney Section */}
        <Card style={styles.sectionCard}>
          <LinearGradient
            colors={[colors.primary, '#4B9FE1']}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionTitle}>Chimney Services</Text>
          </LinearGradient>
          <Card.Content style={styles.sectionContent}>
            <View style={styles.serviceItem}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>Chimney Service & Cleaning</Text>
                <Text style={styles.serviceDescription}>
                  Professional cleaning, filter replacement, and performance check
                </Text>
                <Text style={styles.servicePrice}>₹500-800 (based on model)</Text>
              </View>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('ChimneyService')}
                style={[styles.button, { backgroundColor: colors.primary }]}
              >
                Book
              </Button>
            </View>

            <View style={styles.divider} />

            <View style={styles.serviceItem}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>Buy New Chimney</Text>
                <Text style={styles.serviceDescription}>
                  Explore our range of high-quality chimneys with installation
                </Text>
                <Text style={styles.servicePrice}>Starting from ₹5,999</Text>
              </View>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('ChimneyService', { section: 'buy' })}
                style={[styles.button, { backgroundColor: colors.primary }]}
              >
                Explore
              </Button>
            </View>

            <View style={styles.divider} />

            <View style={styles.serviceItem}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>Chimney Inspection</Text>
                <Text style={styles.serviceDescription}>
                  Technician will inspect & recommend necessary repairs
                </Text>
                <Text style={styles.servicePrice}>₹299 (free with service)</Text>
              </View>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('ChimneyService', { section: 'inspect' })}
                style={[styles.button, { backgroundColor: colors.primary }]}
              >
                Book
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Cooktop Section */}
        <Card style={styles.sectionCard}>
          <LinearGradient
            colors={[colors.secondary, '#F44336']}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionTitle}>Cooktop Services</Text>
          </LinearGradient>
          <Card.Content style={styles.sectionContent}>
            <View style={styles.serviceItem}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>Hob/Cooktop Repair</Text>
                <Text style={styles.serviceDescription}>
                  Fix ignition issues, gas leaks, and other common problems
                </Text>
                <Text style={styles.servicePrice}>₹500-1000</Text>
              </View>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('CooktopService')}
                style={[styles.button, { backgroundColor: colors.secondary }]}
              >
                Book
              </Button>
            </View>

            <View style={styles.divider} />

            <View style={styles.serviceItem}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>Pipe/Burner Replacement</Text>
                <Text style={styles.serviceDescription}>
                  On-site replacement of pipes, burners, and knobs
                </Text>
                <Text style={styles.servicePrice}>Parts + ₹300 labor</Text>
              </View>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('CooktopService', { section: 'parts' })}
                style={[styles.button, { backgroundColor: colors.secondary }]}
              >
                Book
              </Button>
            </View>

            <View style={styles.divider} />

            <View style={styles.serviceItem}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>New Hob/Cooktop</Text>
                <Text style={styles.serviceDescription}>
                  Browse our collection of modern cooktops with installation
                </Text>
                <Text style={styles.servicePrice}>Starting from ₹3,499</Text>
              </View>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('CooktopService', { section: 'buy' })}
                style={[styles.button, { backgroundColor: colors.secondary }]}
              >
                Explore
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* RO & Appliance Section */}
        <Card style={styles.sectionCard}>
          <LinearGradient
            colors={['#7B1FA2', '#9C27B0']}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionTitle}>RO & Appliance Services</Text>
          </LinearGradient>
          <Card.Content style={styles.sectionContent}>
            <View style={styles.serviceItem}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>RO Service</Text>
                <Text style={styles.serviceDescription}>
                  Filter replacement, cleaning, and performance optimization
                </Text>
                <Text style={styles.servicePrice}>₹499</Text>
              </View>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('ROService')}
                style={[styles.button, { backgroundColor: '#7B1FA2' }]}
              >
                Book
              </Button>
            </View>

            <View style={styles.divider} />

            <View style={styles.serviceItem}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>RO Annual Maintenance Contract</Text>
                <Text style={styles.serviceDescription}>
                  Regular servicing and priority support for your RO system
                </Text>
                <Text style={styles.servicePrice}>₹1,299/year</Text>
              </View>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('ROService', { section: 'amc' })}
                style={[styles.button, { backgroundColor: '#7B1FA2' }]}
              >
                Subscribe
              </Button>
            </View>

            <View style={styles.divider} />

            <View style={styles.serviceItem}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>Coming Soon</Text>
                <Text style={styles.serviceDescription}>
                  Fridge, microwave, and oven repair services
                </Text>
                <Text style={styles.servicePrice}>Stay tuned!</Text>
              </View>
              <Button 
                mode="outlined" 
                onPress={() => {}}
                style={styles.buttonOutlined}
                disabled
              >
                Notify Me
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Kitchen Design Special */}
        <Card style={styles.specialOfferCard}>
          <LinearGradient
            colors={[colors.secondary, '#FF9800']}
            style={styles.specialOfferHeader}
          >
            <Text style={styles.specialOfferTitle}>Special Offer</Text>
          </LinearGradient>
          <Card.Content>
            <Title>Want a New Kitchen?</Title>
            <Paragraph style={styles.specialOfferText}>
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
              Book Design Session
            </Button>
          </Card.Actions>
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
  sectionCard: {
    marginBottom: 20,
    elevation: 3,
  },
  sectionHeader: {
    padding: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionContent: {
    paddingVertical: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  serviceInfo: {
    flex: 1,
    paddingRight: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    minWidth: 80,
  },
  buttonOutlined: {
    minWidth: 80,
    borderColor: '#BDBDBD',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  specialOfferCard: {
    marginBottom: 30,
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
  specialOfferText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  cardActions: {
    justifyContent: 'center',
    paddingBottom: 15,
  },
});

export default ServicesScreen;
