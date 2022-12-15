library(ggplot2)

# trend of different region
month_df <- read.csv("./data/monthly_data.csv")
temp_df <- month_df %>%
  group_by(WHO_region, month) %>% 
  summarise(
    New_cases = sum(New_cases),
    New_deaths = sum(New_deaths),
    Cumulative_cases = max(Cumulative_cases),
    Cumulative_deaths = max(Cumulative_deaths),
  )

ggplot(temp_df, aes(x=month, y=New_cases, group = WHO_region, color = WHO_region)) + geom_line()+geom_point()

ggplot(temp_df, aes(x=month, y=New_deaths, group = WHO_region, color = WHO_region)) + geom_line()+geom_point()
       
ggplot(temp_df, aes(x=month, y=Cumulative_cases, group = WHO_region, color = WHO_region)) + geom_line()+geom_point()

ggplot(temp_df, aes(x=month, y=Cumulative_deaths, group = WHO_region, color = WHO_region)) + geom_line()+geom_point()

last_day_df = daily_case[daily_case$Date_reported == "2022-12-13",]

ggplot(last_day_df, aes(x = Cumulative_cases, y = reorder(Country, Cumulative_cases))) +
  geom_point(color = "blue") +
  facet_grid(WHO_region ~ ., scales = "free_y", space = "free_y") +
  ggtitle(' ') +
  xlab("") +
  ylab('') +
  theme_linedraw() +
  theme(panel.grid.major.x = element_blank(), panel.grid.minor.x = element_blank())

library(countrycode)
daily_case$ISO3 = countryname(daily_case$Country, destination = 'iso3c')

fig <- plotly::plot_ly(daily_case, type='choropleth', locations=daily_case$ISO3, z=daily_case$Cumulative_cases, frame = ~Date_reported, text=daily_case$Country, colorscale="magma")

fig
