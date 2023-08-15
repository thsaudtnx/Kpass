# Kpass
oxpay_internship_project

## 🖥️ About
An App displaying business list and discount rate according to Oxpay K-pass & Travel Wallet project
with a Manage Page on a web

##### 1. Mobile App
  <img src="https://github.com/messidona3589/Kpass/assets/79046791/aaad2e6a-82dc-4d99-be59-43c5edc6fcdc" width="200" height="400" />
  <img src="https://github.com/messidona3589/Kpass/assets/79046791/85be36af-745f-4bcb-93fc-b3349c7fbca9" width="200" height="400" />
  <img src="https://github.com/messidona3589/Kpass/assets/79046791/5adef116-6ebe-4666-afc0-7bfe0e294aea" width="200" height="400" />
  <img src="https://github.com/messidona3589/Kpass/assets/79046791/2a60e0cc-922a-43c1-bf00-dd6a8f84d481" width="200" height="400" />
  </br></br>
  
Features
  - Location access using googleMapAPI
  - Manage state with contextAPI and React Query
</br></br>

###### 2. Web
1. Manage Page </br></br>
    <img src="https://github.com/messidona3589/Kpass/assets/79046791/4863e900-99dc-49d2-b7ab-27955ed1713d" width="400" />
    <img src="https://github.com/messidona3589/Kpass/assets/79046791/6ea9a527-c8ab-4195-b483-fc33f855bb40" width="400" />
    </br></br>
2. API </br></br>
    <img src="https://github.com/messidona3589/Kpass/assets/79046791/34543989-4715-4043-9380-1c51186d5a04" width="400" />
    </br></br>
   
Features
- User Authentication with Passport.js
- Connect MySql with sequelize.js
- Display API UI using swagger.js
- Manage state with redux
</br>

## 🕰️ Duration
* 29/05/23 ~ 31/07/23

## ⚙️ Stack
* Front-end ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* Back-end ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
* Mobile ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)

## 📚 Reference
* Node.js 교과서 개정 2판
* React를 다루는 기술
* React Native를 다루는 기술

## 📌 Usage (App Deployment)

* ### Developer Mode
1. Open the window prompt and set the path of ssh
2. ``` ssh -i LightsailDefaultKey-ap-southeast-1.pem  bitnami@XXX.XXX.XXX.XXX ```
3. ``` cd ~/Kpass ```
4. If you want to use mysql then... ``` mysql -u root -p ``` then enter in the password
5. If you wan to edit then push the code to github then ``` git pull origin main ```
6. ``` sudo pm2 reload all ```

* ### How to publish Expo React Native App to Google Play Store? [youtube](https://youtu.be/oBWBDaqNuws)

#### 1. Prerequisite
> 1. Google Play Console > Create developer account
> 2. Create Google Service Account  
> 3. Click three dots on Actions > manage key
> 4. Sign in/up Expo account

#### 2. Technical Process
> 1. Edit app.json file (name, slug, version, android.package, android.versionCode...)
> 2. ``` npm install -g eas-cli ```
> 3. ``` eas login ```
> 4. ``` eas whoami ```
> 5. ``` eas build:configure ```
> 6. ``` eas build --platform android ```
>  - generate a new android keystore
> 7. Click the link and download the file
> 8. Google play console > create app > follow the stages
>  - create app
>  - follow the stages...
>  - privacy policy section use generator

#### 3. Update
> 1. Edit app.json(version, android.version)
> 2. eas.json > submit > production > android {
>  "serviceAccountKeyPath" : "sdfasdfasdfasdf"
> }
> 3. ``` eas build --platform android ```
> 4. click the link to check progress
> 5. ``` eas submit -p android --latest ```
> 6. Check in Google Play Console
> 7. update on promote release > production
> or 
> quick update
> 1. ``` eas publish ```

* ### How to publish Expo React Native App to Apple App Store? [youtube](https://youtu.be/LE4Mgkrf7Sk)
#### 1. Prerequisite
> 1. Apple Developer Account
>  - Sign In / Sign Up
>  - Join the Apple Developer Program
> 2. Expo Account

#### 2. Technical Process
> 1. Edit app.json (name, slug, ...)
> 2. write the command to download eas-cli ``` npm install -g eas-cli ```
> 3. write the command to connect with the expo account ``` eas loggin ```
> 4. write the command to check if the expo account is connected ``` eas whoami ```
> 5. write the command to configure the app ``` eas build:configure ```
> 6. write the command to build the app in ios platform ``` eas build --platform ios ```
>   then follow the instruction...
>   - ios bundle identifier
>   - log in to Apple Account
>   - generate Apple Distribution Certificate
>   - generate Apple Provisioning Profile
> 7. click the link to check the progress on expo website

#### 3. Register on App store
> 1. Go to Apple Developer Dashboard >  App Store Connect > MyApps > Add New App
> 2. Fill in all the information(screenshots, description, keywords, version...)
> 3. App Information section(category, content rights, age rate...)
> 4. Pricing and Availability section(price schedule....)
> 5. App Privacy section 
>   - Go to App Privacy Policies Generator 
>   - after copy the link and paste it to Privacy Policy URL
> 6. Build from expo 

#### 4. Add some properties to file
> 1. eas.json
>   ``` {
>    ...,
>    "submit" : {
>      "production" : {
>        "ios" : {
>          "appleId" : "asdfasdfasdf", //basically my email
>          "ascAppId" : "asdfasdfasdf", //this is on the App Store Connect > App information > AppleId
>          "appleTeamId" : //apple Developer Dashboard > membership > TeamId
>        }
>      }
>    }
>  }
>  ```
> 2. ``` eas submit -p ios --latest ```
>   - (generate)add a new key generate
>   - login to apple developer account
>   - click the link to check the progress

#### 5. App Testing
> 1. Go to TestFlight > Click Manage
> 2. Click Internal Testing +
> 3. Click Testers +
> 4. the user who is invited would receive an email to download the app with TestFlight

#### 6. Submit
> 1. Click App Store > Build
> 2. Submit to App Review
> 3. after the Review is done, release the version

#### 7. Update the App
> 1. Simple update(Over the year update) : write command "expo publish" after the edition
> or 
> Serious Update
> 1. app.json > increment version, buildNumber
> 2. ``` eas build --platform ios ```
> 3. ``` eas submit -p ios --latest ```
> 4. click the link to track the progress
> 5. After, TestFlight > Manage
> 6. click new Version
> 7. release the app





