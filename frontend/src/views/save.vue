<!-- Current Workout Card
    <Card class="w-full shadow-lg shadow-indigo-500/20">
      <CardHeader>
        <CardTitle class="text-lg sm:text-xl">{{ currentWorkout.name }}</CardTitle>
        <CardDescription>{{ currentWorkout.exercise }}</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          <div v-if="currentWorkout.startTime" class="text-sm text-muted-foreground">
            Gestartet um {{ currentWorkout.startTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) }}
          </div>
          <div v-else class="text-sm text-muted-foreground">
            Bereit zum Starten
          </div>

          <div class="flex flex-col gap-2  w-full sm:w-1/2 mx-auto">
            <Button size="lg" variant="outline" class="flex-1 sm:flex-none">
              Übung hinzufügen
            </Button>
            <Button size="lg" variant="outline" class="flex-1 sm:flex-none">
              Workout beenden
            </Button>
          </div>
        </div>
      </CardContent>
    </Card> -->