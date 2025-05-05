# Building the KitchenCare+ APK

This directory contains instructions for building the KitchenCare+ APK.

## Prerequisites

- Android SDK installed and configured
- Node.js and npm installed
- Expo CLI installed (`npm install -g expo-cli`)

## Building the APK

### Option 1: Using Codemagic CI/CD

The repository includes a `codemagic.yaml` file that configures the build process for Codemagic CI/CD. You can use this to build the APK automatically.

1. Set up a Codemagic account and connect it to your GitHub repository
2. Configure the build using the existing `codemagic.yaml` file
3. Run the build to generate the APK

### Option 2: Building Locally

If you have the Android SDK installed, you can build the APK locally:

1. Install dependencies: `npm install`
2. Generate Android project: `npx expo prebuild -p android --clean`
3. Build the APK: `cd android && ./gradlew assembleRelease`
4. The APK will be available at `android/app/build/outputs/apk/release/app-release.apk`

### Option 3: Using Expo EAS Build

You can also use Expo's EAS Build service:

1. Install EAS CLI: `npm install -g eas-cli`
2. Log in to your Expo account: `eas login`
3. Configure the build: `eas build:configure`
4. Build the APK: `eas build --platform android --profile preview`

## APK Features

The APK includes all the features specified in the requirements:

- Mobile-first responsive layout
- Clean, modern UI with Blue-Red Gradient color scheme
- All three plans (Basic, Advanced, Elite) with correct details
- Services sections (Chimney, Cooktop, RO & Appliance)
- User authentication and profile management
- Kitchen design form with photo upload
- Razorpay payment gateway integration in sandbox mode
