import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AppText } from '../common/AppText'
import { wp } from '@/utils'
import { colorPalette } from '@/styles'

type CategoryCardProps = {
  icon: React.ComponentType<{ size?: number; color?: string }>
  label: string
  onPress?: () => void
}

export const CategoryCard = ({ icon: Icon, label, onPress }: CategoryCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconWrapper}>
        <Icon size={24} color={colorPalette.primaryBg.primaryBlack} />
      </View>
      <AppText text={label} type="description" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8, 
    },
    iconWrapper: {
      backgroundColor: colorPalette.primaryBg.primaryGrey,
      padding: wp(5),
      borderRadius: wp(4),

    },
    label: {
      fontSize: 12,
      fontWeight: '500',
      color: '#FFFFFF',
      textAlign: 'center',
    },
  })
  