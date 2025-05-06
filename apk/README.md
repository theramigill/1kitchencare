# KitchenCare+ APK Build Guide

This guide provides detailed instructions for building the KitchenCare+ Android APK using different methods.

## Prerequisites

- Node.js (v18.17.1 or later)
- Java Development Kit (JDK) 11
- Android SDK

## Option 1: Building with Codemagic CI/CD (Recommended)

The repository includes a `codemagic.yaml` file that configures the build process. To build using Codemagic:

1. Log in to [Codemagic](https://codemagic.io/)
2. Add the repository to your Codemagic account
3. Start a new build using the Android workflow defined in `codemagic.yaml`
4. Download the APK from the build artifacts

### Important Codemagic Configuration Notes

The `codemagic.yaml` file includes the following optimizations:

- Uses Node.js 18.17.1 and Java 11
- Installs dependencies with `npm install --legacy-peer-deps`
- Sets up Android SDK licenses automatically
- Configures app.json with `newArchEnabled: false`
- Creates and configures the release keystore
- Cleans the Gradle build before assembling the release APK

## Option 2: Building Locally

### Step 1: Clean Installation

```bash
# Remove any existing build artifacts
rm -rf node_modules
rm -f package-lock.json
rm -rf android/app/build
rm -rf android/.gradle
rm -rf .expo

# Install dependencies with legacy peer deps flag
npm install --legacy-peer-deps
```

### Step 2: Configure Android SDK

Create a `local.properties` file in the `android` directory with your Android SDK path:

```bash
# Replace with your actual Android SDK path
echo "sdk.dir=/path/to/your/android/sdk" > android/local.properties
```

### Step 3: Create Android SDK License Files

```bash
mkdir -p android/licenses
echo "8933bad161af4178b1185d1a37fbf41ea5269c55" > android/licenses/android-sdk-license
echo "d56f5187479451eabf01fb78af6dfcb131a6481e" >> android/licenses/android-sdk-license
echo "24333f8a63b6825ea9c5514f83c2829b004d1fee" >> android/licenses/android-sdk-license
echo "84831b9409646a918e30573bab4c9c91346d8abd" > android/licenses/android-sdk-preview-license
```

### Step 4: Generate Android Project

```bash
npx expo prebuild -p android --clean
```

### Step 5: Create Keystore for Signing

```bash
keytool -genkey -v -keystore android/app/release.keystore -alias kitchencare -keyalg RSA -keysize 2048 -validity 10000 -storepass kitchencare -keypass kitchencare -dname "CN=KitchenCare, OU=Mobile, O=KitchenCare, L=Delhi, S=Delhi, C=IN"
```

### Step 6: Update Signing Configuration

Ensure that `android/app/build.gradle` has the following signing configuration:

```gradle
signingConfigs {
    release {
        storeFile file('release.keystore')
        storePassword 'kitchencare'
        keyAlias 'kitchencare'
        keyPassword 'kitchencare'
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        // other configuration...
    }
}
```

### Step 7: Build the APK

```bash
cd android
chmod +x ./gradlew
./gradlew clean
./gradlew assembleRelease
```

The APK will be generated at `android/app/build/outputs/apk/release/app-release.apk`.

## Option 3: Using Expo EAS Build

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2: Log in to Expo

```bash
eas login
```

### Step 3: Configure EAS Build

```bash
eas build:configure
```

### Step 4: Build the APK

```bash
eas build -p android --profile preview
```

This will build the APK on Expo's servers and provide a download link when complete.

## Troubleshooting

### Common Issues

1. **SDK location not found**
   - Ensure `local.properties` file exists in the `android` directory with the correct SDK path
   - Make sure the Android SDK path is correctly set in your environment variables

2. **Gradle build fails**
   - Try running `./gradlew clean` before building
   - Check that all dependencies are installed with `npm install --legacy-peer-deps`
   - Verify that `compileSdkVersion` is properly set in `build.gradle`

3. **Signing issues**
   - Verify that the keystore file exists at `android/app/release.keystore`
   - Check that the signing configuration in `build.gradle` matches the keystore details

4. **Expo modules errors**
   - Ensure `newArchEnabled` is set to `false` in `app.json`
   - Try reinstalling dependencies with `npm install --legacy-peer-deps`
   - Check for any conflicts in the expo modules versions

5. **React Native Razorpay issues**
   - The app now uses a simplified payment flow without native Razorpay integration
   - If you need to add Razorpay back, follow the official Razorpay React Native documentation

## APK Features

The APK includes all the features specified in the requirements:

- Mobile-first responsive layout
- Clean, modern UI with Blue-Red Gradient color scheme
- All three plans (Basic, Advanced, Elite) with correct details
- Services sections (Chimney, Cooktop, RO & Appliance)
- User authentication and profile management
- Kitchen design form with photo upload
- Simplified payment flow (mock implementation)
- Contact Support button
- Terms & Conditions and Privacy Policy placeholders

For additional help, please contact support@kitchencareplus.in.
