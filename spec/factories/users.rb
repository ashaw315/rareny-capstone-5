FactoryBot.define do
  factory :user do
    username { Faker::Internet.unique.username(specifier: 5..10) }
    password { "password123" }
    password_confirmation { "password123" }
    bio { Faker::Lorem.paragraph(sentence_count: 3) }
    website { Faker::Internet.url }
    discipline { Faker::Lorem.word }

    trait :without_optional_fields do
      bio { nil }
      website { nil }
      discipline { nil }
    end

    trait :invalid do
      username { nil }
    end
  end
end