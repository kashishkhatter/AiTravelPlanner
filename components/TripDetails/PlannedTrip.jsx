import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Colors } from '../../constants/Colors';

const UNSPLASH_API_KEY = 'l_bdk0toY78YgpLhmeboXAjQsukiv2XJfUaM7Hcv4hw'; // Replace with your Unsplash API Key
const PER_PAGE = 5; // Fetch more images per request to avoid duplicates
const MAX_RETRIES = 5; // Max retries to avoid duplicate images

const fallbackImages = [
  'https://via.placeholder.com/400x300?text=Day+1+Image',
  'https://via.placeholder.com/400x300?text=Day+2+Image',
  'https://via.placeholder.com/400x300?text=Day+3+Image',
  'https://via.placeholder.com/400x300?text=Day+4+Image',
  'https://via.placeholder.com/400x300?text=Day+5+Image',
  // Add more fallback URLs as needed
];

const PlannedTrip = ({ itenary }) => {
  const [images, setImages] = useState({});
  const [fetchedImageUrls, setFetchedImageUrls] = useState(new Set()); // To avoid repeated images
  const [usedQueries, setUsedQueries] = useState(new Set()); // Avoid repeating search queries

  // Fetch images for each day's itinerary plan
  useEffect(() => {
    const fetchImagesForItinerary = async () => {
      const newImages = {};

      for (let i = 0; i < Object.keys(itenary).length; i++) {
        const day = Object.keys(itenary)[i];
        const plan = itenary[day];
        const query = plan.morning?.activity || plan.afternoon?.activity || plan.evening?.activity || 'scenic';

        // Skip if query was already used
        if (usedQueries.has(query)) {
          newImages[day] = fallbackImages[i % fallbackImages.length]; // Assign unique fallback image
          continue;
        }

        try {
          const res = await axios.get(
            `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}&per_page=${PER_PAGE}`
          );
          const imageResults = res.data.results;

          if (imageResults.length > 0) {
            let imageUrl;
            let retries = 0;

            do {
              // Get a random image URL
              const randomImage = imageResults[Math.floor(Math.random() * imageResults.length)];
              imageUrl = randomImage.urls.small;
              retries++;
            } while (fetchedImageUrls.has(imageUrl) && retries < MAX_RETRIES);

            // Set image URL or fallback if none are found
            if (fetchedImageUrls.has(imageUrl)) {
              newImages[day] = fallbackImages[i % fallbackImages.length]; // Assign fallback image
            } else {
              newImages[day] = imageUrl;
              setFetchedImageUrls(prev => new Set(prev).add(imageUrl)); // Track used URLs
            }
          } else {
            newImages[day] = fallbackImages[i % fallbackImages.length]; // Use fallback if no image found
          }

          setUsedQueries(prev => new Set(prev).add(query)); // Mark query as used
        } catch (error) {
          console.error(`Error fetching image for ${day}:`, error);
          newImages[day] = fallbackImages[i % fallbackImages.length]; // Use fallback on error
        }
      }

      setImages(newImages);
    };

    fetchImagesForItinerary();
  }, [itenary]);

  const renderDayPlan = (day, plan) => {
    return (
      <View style={styles.dayPlanContainer} key={day}>
        <Text style={styles.dayHeader}>{day.replace('day', 'Day ')} Plan</Text>
        <Image source={{ uri: images[day] }} style={styles.dayImage} />
        {/* Morning Plan */}
        {plan.morning && (
          <View style={styles.activityContainer}>
            <Text style={styles.time}>{plan.morning.time}</Text>
            <Text style={styles.activity}>{plan.morning.activity}</Text>
            <Text style={styles.details}>{plan.morning.details}</Text>
          </View>
        )}

        {/* Afternoon Plan */}
        {plan.afternoon && (
          <View style={styles.activityContainer}>
            <Text style={styles.time}>{plan.afternoon.time}</Text>
            <Text style={styles.activity}>{plan.afternoon.activity}</Text>
            <Text style={styles.details}>{plan.afternoon.details}</Text>
          </View>
        )}

        {/* Evening Plan */}
        {plan.evening && (
          <View style={styles.activityContainer}>
            <Text style={styles.time}>{plan.evening.time}</Text>
            <Text style={styles.activity}>{plan.evening.activity}</Text>
            <Text style={styles.details}>{plan.evening.details}</Text>
          </View>
        )}
      </View>
    );
  };

  const sortedDays = Object.keys(itenary).sort((a, b) => {
    const dayA = parseInt(a.replace('day', ''), 10);
    const dayB = parseInt(b.replace('day', ''), 10);
    return dayA - dayB;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.itineraryTitle}>🏕️Your Itinerary</Text>
      {sortedDays.map((day) => renderDayPlan(day, itenary[day]))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  itineraryTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 26,
    color: Colors.dark_blue,
    textAlign: 'center',
    marginBottom: 25,
  },
  dayPlanContainer: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderColor: Colors.primary,
    borderWidth: 1,
    elevation: 4, // Enhanced shadow for Android
    shadowColor: '#000', // Subtle shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  dayHeader: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    marginBottom: 15,
    color: Colors.dark_blue,
  },
  dayImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  activityContainer: {
    marginBottom: 15,
  },
  time: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 5,
  },
  activity: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: Colors.dark_grey,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  details: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.grey,
  },
});

export default PlannedTrip;
