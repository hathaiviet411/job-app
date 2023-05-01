import React from 'react';

import { icons } from '../../../constants';
import { checkImageURL } from '../../../utils';
import { View, Text, Image } from 'react-native';

import styles from './company.style';

const Company = ({ companyLogo, jobTitle, companyName, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: checkImageURL(companyLogo) ?
              companyLogo :
              'https://w7.pngwing.com/pngs/574/475/png-transparent-logo-xunit-random-org-randomness-computer-software-logo-github-blue-angle-text.png'
          }}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>

      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName} / </Text>

        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode='contain'
            style={styles.locationImage}
          />

          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default Company;