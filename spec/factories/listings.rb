FactoryBot.define do
  factory :listing do
    association :user
    title { Faker::Commerce.product_name }
    description { Faker::Lorem.paragraph(sentence_count: 3) }
    price { Faker::Commerce.price(range: 10.0..1000.0).to_i }
    sq_footage { rand(100..3000) }
    email { Faker::Internet.email }
    neighborhood { Faker::Address.city }
    nyc_borough { %w[Manhattan Brooklyn Queens Bronx "Staten Island"].sample }
    image1 { Faker::Avatar.image }
    image2 { Faker::Avatar.image }
    image3 { Faker::Avatar.image }

    trait :expensive do
      price { Faker::Commerce.price(range: 1000.0..10000.0).to_i }
    end

    trait :large do
      sq_footage { rand(2000..5000) }
    end
  end
end