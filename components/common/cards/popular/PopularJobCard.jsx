import React from 'react';

import { checkImageURL } from '../../../../utils';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './popularjobcard.style';

const PopularJobCard = ({ item, selectedJob, handleCardPress, itemKey }) => {

  return (
    <TouchableOpacity
      key={itemKey}
      onPress={() => { handleCardPress(item) }}
      style={styles.container(selectedJob, item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            uri: checkImageURL(item?.employer_logo)
              ? item?.employer_logo
              : 'https://w7.pngwing.com/pngs/574/475/png-transparent-logo-xunit-random-org-randomness-computer-software-logo-github-blue-angle-text.png'
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <Text style={styles.companyName} numberOfLines={1}>
        {item?.employer_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item?.job_title}
        </Text>

        <Text style={styles.location}>{item?.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;