FROM reactnativecommunity/react-native-android:latest

WORKDIR /app

COPY . /app

RUN npm install

RUN npx react-native bundle --platform android --dev false --entry-file App.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

WORKDIR /app/android

RUN rm -rf app/src/main/res/drawable-*

RUN ./gradlew assembleRelease

CMD ["bash", "-c", "cp -f ./app/build/outputs/apk/release/app-release.apk /apk_vol/client.apk && echo pong"]