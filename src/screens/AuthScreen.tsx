import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, Title, Paragraph, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../services/AuthProvider';

const AuthScreen = () => {
  const { colors } = useTheme();
  const { signIn, signUp } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        await signUp(email, password);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={styles.header}
        >
          <View style={styles.logoContainer}>
            {/* Logo placeholder - in a real app, use an actual logo image */}
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>KC+</Text>
            </View>
          </View>
          <Text style={styles.headerTitle}>KitchenCare+</Text>
          <Text style={styles.headerSubtitle}>India's 1st kitchen protection service</Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          <Title style={styles.formTitle}>{isLogin ? 'Welcome Back' : 'Create Account'}</Title>
          <Paragraph style={styles.formSubtitle}>
            {isLogin 
              ? 'Sign in to access your kitchen protection services' 
              : 'Join KitchenCare+ to protect your kitchen'
            }
          </Paragraph>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {!isLogin && (
            <TextInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              autoCapitalize="words"
            />
          )}

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
          />

          {!isLogin && (
            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              style={styles.input}
              secureTextEntry
            />
          )}

          <Button
            mode="contained"
            onPress={handleAuth}
            style={[styles.authButton, { backgroundColor: colors.primary }]}
            loading={loading}
            disabled={loading}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>

          <TouchableOpacity onPress={toggleAuthMode} style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Text style={[styles.toggleLink, { color: colors.primary }]}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Text>
            </Text>
          </TouchableOpacity>

          {isLogin && (
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 30,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 15,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
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
  formContainer: {
    padding: 20,
    marginTop: -20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  formTitle: {
    fontSize: 24,
    marginBottom: 5,
  },
  formSubtitle: {
    marginBottom: 20,
    color: '#666',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  authButton: {
    marginTop: 10,
    paddingVertical: 8,
  },
  toggleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
  },
  toggleLink: {
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AuthScreen;
