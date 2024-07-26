import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { ProgressBar, IconButton, Avatar } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';

const getWeekDays = (selectedDate: string) => {
  const baseDate = new Date(selectedDate);
  const weekDays = [];
  const dayOfWeek = baseDate.getDay() === 0 ? 6 : baseDate.getDay() - 1; // Monday as start of the week

  const startOfWeek = new Date(baseDate);
  startOfWeek.setDate(baseDate.getDate() - dayOfWeek); // Adjust to start from Monday

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    weekDays.push({
      dayLetter: currentDate.toLocaleString('default', { weekday: 'short' })[0].toUpperCase(), // 'L', 'M', etc.
      date: currentDate.getDate()+1, // 1 to 31
      fullDate: currentDate.toISOString().split('T')[0], // Store the full date in ISO format for comparison
    });
  }
  return weekDays;
};

const isDateSelected = (selectedDate: string, date: string) => {
  return selectedDate === date;
};

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const weekDays = getWeekDays(selectedDate);

  const openCalendar = () => {
    setModalVisible(true);
  };

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton icon="menu" size={24} onPress={() => {}} />
        <TouchableOpacity onPress={openCalendar}>
          <Text style={styles.headerTitle}>Hoy</Text>
          <Text style={styles.headerTitle}>{selectedDate}</Text>
        </TouchableOpacity>
        <Avatar.Image size={24} source={{ uri: 'https://via.placeholder.com/24' }} />
      </View>

      {/* Calendar Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Calendar */}
      <View style={styles.calendar}>
        {weekDays.map((day, index) => (
          <View key={index} style={styles.day}>
            <Text style={styles.dayText}>{day.dayLetter}</Text>
            <View style={[
              styles.dateContainer,
              isDateSelected(selectedDate, day.fullDate) && styles.selectedDateContainer,
            ]}>
              <Text style={styles.dateText}>{day.date}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Macros */}
      <View style={styles.macros}>
        <View style={styles.macro}>
          <Text style={styles.macroLabel}>Proteínas</Text>
          <Text style={styles.macroValue}>0 / 124 g</Text>
        </View>
        <View style={styles.macro}>
          <Text style={styles.macroLabel}>Carbs</Text>
          <Text style={styles.macroValue}>0 / 171 g</Text>
        </View>
        <View style={styles.macro}>
          <Text style={styles.macroLabel}>Grasas</Text>
          <Text style={styles.macroValue}>0 / 56 g</Text>
        </View>
      </View>

      {/* Premium Banner */}
      <TouchableOpacity style={styles.premiumBanner}>
        <Text style={styles.premiumText}>Goza el 100% de Balance Life con Premium</Text>
      </TouchableOpacity>

      {/* Progress Steps */}
      <View style={styles.steps}>
        <Text style={styles.stepsTitle}>Primeros pasos</Text>
        <ProgressBar progress={0.6} color="#FFD700" style={styles.progressBar} />
        <View style={styles.step}>
          <IconButton icon="check-circle" size={20} />
          <Text style={styles.stepText}>Crea tu cuenta</Text>
        </View>
        <View style={styles.step}>
          <IconButton icon="check-circle" size={20} />
          <Text style={styles.stepText}>Arma Tu Primer Día</Text>
        </View>
        <View style={styles.step}>
          <IconButton icon="check-circle" size={20} />
          <Text style={styles.stepText}>Completa tus calorías diarias</Text>
        </View>
        <View style={styles.step}>
          <IconButton icon="circle-outline" size={20} />
          <Text style={styles.stepText}>Registra tu peso</Text>
        </View>
        <View style={styles.step}>
          <IconButton icon="circle-outline" size={20} />
          <Text style={styles.stepText}>Únete o crea un Team</Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.navigation}>
        {['Plan', 'Base Datos', 'Recetas', 'Teams', 'Progreso'].map((item, index) => (
          <View key={index} style={styles.navItem}>
            <Text style={styles.navText}>{item}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  day: {
    alignItems: 'center',
  },
  dayText: {
    color: 'white',
    fontSize: 14,
  },
  dateContainer: {
    borderRadius: 50,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateContainer: {
    backgroundColor: '#FFD700',
  },
  dateText: {
    color: 'white',
    fontSize: 14,
  },
  macros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  macro: {
    alignItems: 'center',
  },
  macroLabel: {
    color: 'white',
    fontSize: 14,
  },
  macroValue: {
    color: 'white',
    fontSize: 14,
  },
  premiumBanner: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  premiumText: {
    color: 'black',
    fontSize: 16,
  },
  steps: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
  },
  stepsTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#FFD700',
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
  },
});
