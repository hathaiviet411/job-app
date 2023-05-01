import React from 'react';

import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './nearbyjobs.style';
import useFetch from '../../../hook/useFetch';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch('search', {
    query: 'React Developer',
    page: 1,
    num_pages: 1,
  });

  const handleCardPressed = (job) => {
    router.push(`/job-details/${job.job_id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>

        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data.map((job, index) => (
            <NearbyJobCard
              itemKey={`nearby-job-${job?.job_id}-${index}`}
              job={job}
              handleNavigate={() => { handleCardPressed(job) }}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;