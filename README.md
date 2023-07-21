# Kpass
oxpayment_internship_project

WEB_FRONTEND - react, contextAPI, infiniteScroll...
WEB_BACKEND - express, sequelize, passport, swagger, AWS...
MOBILE - react native, expo...

# How to publish Expo React Native App to Google Play Store?
- ref notJust.dev Youtube

// Prerequisite
1. Google Play Console > Create developer account
2. Create Google Service Account  
  - Go to Setup > API access > choose the project to link > create new project > create new service account > google cloud platform link> create new service account
3. Click three dots on Actions > manage key
3. Sign in/up Expo account

// Technical process
1. Edit app.json file (name, slug, version, android.package, android.versionCode...)
2. npm install -g eas-cli
3. eas login
4. eas whoami
5. eas build:configure
6. eas build --platform android
  - generate a new android keystore
7. Click the link and download the file
8. Google play console > create app > follow the stages
  - create app
  - follow the stages...
  - privacy policy section use generator

//update
1. Edit app.json(version, android.version)
2. eas.json > submit > production > android {
  "serviceAccountKeyPath" : "sdfasdfasdfasdf"
}
3. eas build --platform android
4. click the link to check progress
5. eas submit -p android --latest
6. Check in Google Play Console
7. update on promote release > production
or 
quick update
1. eas publish



# How to publish Expo React Native App to Apple App Store?
- ref notJust.dev Youtube

// Prerequisite
1. Apple Developer Account
  - Sign In / Sign Up
  - Join the Apple Developer Program
2. Expo Account

// Technical Process
1. Edit app.json (name, slug, ...)
2. write the command to download eas-cli
  - npm install -g eas-cli
3. write the command to connect with the expo account
  - eas loggin
4. write the command to check if the expo account is connected
  - eas whoami
5. write the command to configure the app 
  - eas build:configure
6. write the command to build the app in ios platform
  - eas build --platform ios
  then follow the instruction...
  - ios bundle identifier
  - log in to Apple Account
  - generate Apple Distribution Certificate
  - generate Apple Provisioning Profile
7. click the link to check the progress on expo website

// Register on App store
1. Go to Apple Developer Dashboard >  App Store Connect > MyApps > Add New App
2. Fill in all the information(screenshots, description, keywords, version...)
3. App Information section(category, content rights, age rate...)
4. Pricing and Availability section(price schedule....)
5. App Privacy section 
  - Go to App Privacy Policies Generator 
  - after copy the link and paste it to Privacy Policy URL
6. Build from expo 

// Add some properties to file
1. eas.json
  {
    ...,
    "submit" : {
      "production" : {
        "ios" : {
          "appleId" : "asdfasdfasdf", //basically my email
          "ascAppId" : "asdfasdfasdf", //this is on the App Store Connect > App information > AppleId
          "appleTeamId" : //apple Developer Dashboard > membership > TeamId
        }
      }
    }
  }
2. eas submit -p ios --latest
  - (generate)add a new key generate
  - login to apple developer account
  - click the link to check the progress

// App Testing
1. Go to TestFlight > Click Manage
2. Click Internal Testing +
3. Click Testers +
4. the user who is invited would receive an email to download the app with TestFlight

// Submit
1. Click App Store > Build
2. Submit to App Review
3. after the Review is done, release the version

// Update the App
1. Simple update(Over the year update) : write command "expo publish" after the edition
or 
Serious Update
1. app.json > increment version, buildNumber
2. eas build --platform ios
3. eas submit -p ios --latest
4. click the link to track the progress
5. After, TestFlight > Manage
6. click new Version
7. release the app





