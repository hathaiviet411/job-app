import React from 'react';
import axios from 'axios';
import styles from '../../styles/search';

import { Text, SafeAreaView } from 'react-native';
import { COLORS, icons, SIZES } from '../../constants';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { ScreenHeaderBtn, NearbyJobCard } from '../../components';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native';

const rapidApiKey = '7ca243ed6fmshd305a33892681bbp1462e0jsna96a8527ed6a';

const JobSearch = () => {
  const params = useSearchParams();
  const router = useRouter()

  const [searchResult, setSearchResult] = React.useState([]);
  const [searchLoader, setSearchLoader] = React.useState(false);
  const [searchError, setSearchError] = React.useState(null);
  const [page, setPage] = React.useState(1);

  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([])

    try {
      const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
        params: {
          query: params.id,
          page: page.toString(),
        },
      };

      const response = await axios.request(options);

      setSearchResult(response.data.data);
    } catch (error) {
      console.log(error);
      setSearchError(error);
    } finally {
      setSearchLoader(false);
    }
  };

  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === 'right') {
      setPage(page + 1);
      handleSearch();
    }
  }

  React.useEffect(() => {
    handleSearch();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => { router.back() }}
            />
          ),
          headerTitle: '',
        }}
      />

      <FlatList
        data={searchResult}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => { router.push(`/job-details/${item.job_id}`) }}
          />
        )}
        keyExtractor={(item) => { item.job_id }}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>

            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
              ) : searchError && (
                <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => { handlePagination('left') }}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode='contain'
              />
            </TouchableOpacity>

            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>

            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => { handlePagination('right') }}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default JobSearch;