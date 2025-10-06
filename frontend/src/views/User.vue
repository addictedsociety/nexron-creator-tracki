<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { User, Mail, Calendar, Target, Edit3, Check, X } from 'lucide-vue-next'

// User profile data
const userProfile = ref({
  profilePicture: null as string | null,
  name: '',
  lastname: '',
  email: '',
  weight: 85,
  height: 180,
  age: 28,
  targetWeight: 80,
  fitnessGoal: 'Gewicht verlieren',
  joinDate: new Date('2024-01-15')
})

// Edit mode states
const isEditingProfile = ref(false)
const isEditingWeight = ref(false)

// Form data for editing
const editForm = ref({
  name: '',
  lastname: '',
  email: '',
  weight: 0,
  height: 0,
  age: 0,
  targetWeight: 0
})

// Profile picture handling
const profilePictureInput = ref<HTMLInputElement>()
const profilePictureUrl = ref<string>('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face')

// Computed properties
const bmi = computed(() => {
  const heightInM = userProfile.value.height / 100
  return (userProfile.value.weight / (heightInM * heightInM)).toFixed(1)
})

const bmiCategory = computed(() => {
  const bmiValue = parseFloat(bmi.value)
  if (bmiValue < 18.5) return { text: 'Untergewicht', color: 'text-blue-600' }
  if (bmiValue < 25) return { text: 'Normalgewicht', color: 'text-green-600' }
  if (bmiValue < 30) return { text: 'Übergewicht', color: 'text-orange-600' }
  return { text: 'Adipositas', color: 'text-red-600' }
})

const weightProgress = computed(() => {
  const progress = ((userProfile.value.weight - userProfile.value.targetWeight) / userProfile.value.weight) * 100
  return Math.max(0, Math.min(100, progress))
})

// Functions
const startEditingProfile = () => {
  editForm.value = { ...userProfile.value }
  isEditingProfile.value = true
}

const cancelEditingProfile = () => {
  isEditingProfile.value = false
  editForm.value = { name: '', lastname: '', email: '', weight: 0, height: 0, age: 0, targetWeight: 0 }
}

const saveProfile = () => {
  Object.assign(userProfile.value, editForm.value)
  isEditingProfile.value = false
}

const startEditingWeight = () => {
  editForm.value.weight = userProfile.value.weight
  editForm.value.targetWeight = userProfile.value.targetWeight
  isEditingWeight.value = true
}

const cancelEditingWeight = () => {
  isEditingWeight.value = false
}

const saveWeight = () => {
  userProfile.value.weight = editForm.value.weight
  userProfile.value.targetWeight = editForm.value.targetWeight
  isEditingWeight.value = false
}

const handleProfilePictureChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profilePictureUrl.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const triggerProfilePictureUpload = () => {
  profilePictureInput.value?.click()
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="text-center sm:text-left">
      <h1 class="text-2xl sm:text-3xl font-bold">Benutzerprofil</h1>
      <p class="text-muted-foreground mt-1">Verwalte deine persönlichen Informationen und Ziele.</p>
    </div>

    <!-- Profile Picture & Basic Info Card -->
    <Card class="w-full">
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle class="text-lg sm:text-xl flex items-center gap-2">
            <User class="h-5 w-5" />
            Profil
          </CardTitle>
          <Button 
            @click="startEditingProfile" 
            variant="outline" 
            size="sm"
            v-if="!isEditingProfile"
            class="flex items-center gap-2"
          >
            <Edit3 class="h-4 w-4" />
            <span class="hidden sm:inline">Bearbeiten</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent class="space-y-6">
        <!-- Profile Picture Section -->
        <div class="flex flex-col sm:flex-row items-center gap-4">
          <div class="relative">
            <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-secondary">
              <img 
                v-if="profilePictureUrl" 
                :src="profilePictureUrl" 
                alt="Profilbild" 
                class="w-full h-full object-cover"
              >
              <div v-else class="w-full h-full flex items-center justify-center">
                <User class="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <Button 
              @click="triggerProfilePictureUpload"
              size="sm"
              variant="outline"
              class="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
            >
              <Edit3 class="h-3 w-3" />
            </Button>
            <input 
              ref="profilePictureInput"
              type="file" 
              accept="image/*"
              @change="handleProfilePictureChange"
              class="hidden"
            >
          </div>
          
          <div class="flex-1 text-center sm:text-left space-y-2">
            <Button 
              @click="triggerProfilePictureUpload"
              variant="outline"
              size="sm"
              class="mb-2"
            >
              PB Ändern
            </Button>
            <p class="text-sm text-muted-foreground">
              Klicke auf "PB Ändern" um dein Profilbild zu aktualisieren.
            </p>
          </div>
        </div>

        <!-- Profile Form -->
        <div class="space-y-4">
          <!-- Name Fields -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="name">Name</Label>
              <Input 
                v-if="isEditingProfile"
                id="name"
                v-model="editForm.name"
                placeholder="Vorname"
              />
              <div v-else class="px-3 py-2 bg-secondary rounded-md text-sm">
                {{ userProfile.name || 'Nicht angegeben' }}
              </div>
            </div>
            
            <div class="space-y-2">
              <Label for="lastname">Nachname</Label>
              <Input 
                v-if="isEditingProfile"
                id="lastname"
                v-model="editForm.lastname"
                placeholder="Nachname"
              />
              <div v-else class="px-3 py-2 bg-secondary rounded-md text-sm">
                {{ userProfile.lastname || 'Nicht angegeben' }}
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <Label for="email" class="flex items-center gap-2">
              <Mail class="h-4 w-4" />
              E-Mail
            </Label>
            <Input 
              v-if="isEditingProfile"
              id="email"
              v-model="editForm.email"
              type="email"
              placeholder="E-Mail Adresse"
            />
            <div v-else class="px-3 py-2 bg-secondary rounded-md text-sm">
              {{ userProfile.email || 'Nicht angegeben' }}
            </div>
          </div>

          <!-- Physical Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="space-y-2">
              <Label for="height">Größe (cm)</Label>
              <Input 
                v-if="isEditingProfile"
                id="height"
                v-model.number="editForm.height"
                type="number"
                placeholder="180"
              />
              <div v-else class="px-3 py-2 bg-secondary rounded-md text-sm">
                {{ userProfile.height }} cm
              </div>
            </div>
            
            <div class="space-y-2">
              <Label for="age">Alter</Label>
              <Input 
                v-if="isEditingProfile"
                id="age"
                v-model.number="editForm.age"
                type="number"
                placeholder="28"
              />
              <div v-else class="px-3 py-2 bg-secondary rounded-md text-sm">
                {{ userProfile.age }} Jahre
              </div>
            </div>

            <div class="space-y-2">
              <Label>Mitglied seit</Label>
              <div class="px-3 py-2 bg-secondary rounded-md text-sm flex items-center gap-2">
                <Calendar class="h-4 w-4" />
                {{ userProfile.joinDate.toLocaleDateString('de-DE') }}
              </div>
            </div>
          </div>

          <!-- Action Buttons for Profile Editing -->
          <div v-if="isEditingProfile" class="flex gap-2 justify-end">
            <Button @click="cancelEditingProfile" variant="outline" size="sm">
              <X class="h-4 w-4 mr-2" />
              Abbrechen
            </Button>
            <Button @click="saveProfile" size="sm">
              <Check class="h-4 w-4 mr-2" />
              Speichern
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Weight & Goals Card -->
    <Card class="w-full">
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle class="text-lg sm:text-xl flex items-center gap-2">
            <Target class="h-5 w-5" />
            Gewicht & Ziele
          </CardTitle>
          <Button 
            @click="startEditingWeight" 
            variant="outline" 
            size="sm"
            v-if="!isEditingWeight"
            class="flex items-center gap-2"
          >
            <Edit3 class="h-4 w-4" />
            <span class="hidden sm:inline">Aktualisieren</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent class="space-y-6">
        <!-- Current Weight Display -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <!-- Weight Section -->
          <div class="space-y-4">
            <div class="text-center">
              <div class="text-3xl sm:text-4xl font-bold text-primary">
                {{ isEditingWeight ? editForm.weight : userProfile.weight }}kg
              </div>
              <div class="text-sm text-muted-foreground">Aktuelles Gewicht</div>
            </div>
            
            <div v-if="isEditingWeight" class="space-y-2">
              <Label for="current-weight">Gewicht (kg)</Label>
              <Input 
                id="current-weight"
                v-model.number="editForm.weight"
                type="number"
                step="0.1"
                placeholder="85"
              />
            </div>
          </div>

          <!-- Target Weight Section -->
          <div class="space-y-4">
            <div class="text-center">
              <div class="text-3xl sm:text-4xl font-bold text-green-600">
                {{ isEditingWeight ? editForm.targetWeight : userProfile.targetWeight }}kg
              </div>
              <div class="text-sm text-muted-foreground">Zielgewicht</div>
            </div>
            
            <div v-if="isEditingWeight" class="space-y-2">
              <Label for="target-weight">Zielgewicht (kg)</Label>
              <Input 
                id="target-weight"
                v-model.number="editForm.targetWeight"
                type="number"
                step="0.1"
                placeholder="80"
              />
            </div>
          </div>
        </div>

        <!-- BMI Display -->
        <div class="border rounded-lg p-4 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">BMI</span>
            <span class="text-lg font-bold">{{ bmi }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Kategorie</span>
            <span class="text-sm font-medium" :class="bmiCategory.color">{{ bmiCategory.text }}</span>
          </div>
        </div>

        <!-- Progress to Goal -->
        <div class="space-y-3">
          <div class="flex items-center justify-between text-sm">
            <span>Fortschritt zum Ziel</span>
            <span>{{ Math.abs(userProfile.weight - userProfile.targetWeight).toFixed(1) }}kg verbleibend</span>
          </div>
          <div class="w-full bg-secondary rounded-full h-3">
            <div 
              class="bg-primary h-3 rounded-full transition-all duration-300" 
              :style="{ width: `${Math.max(10, 100 - weightProgress)}%` }"
            ></div>
          </div>
        </div>

        <!-- Action Buttons for Weight Editing -->
        <div v-if="isEditingWeight" class="flex gap-2 justify-end">
          <Button @click="cancelEditingWeight" variant="outline" size="sm">
            <X class="h-4 w-4 mr-2" />
            Abbrechen
          </Button>
          <Button @click="saveWeight" size="sm">
            <Check class="h-4 w-4 mr-2" />
            Aktualisieren
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>