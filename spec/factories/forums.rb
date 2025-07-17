FactoryBot.define do
  factory :forum do
    name { Faker::Lorem.words(number: 2).join(' ').titleize }
    
    trait :with_subforums do
      after(:create) do |forum|
        create_list(:subforum, 3, forum: forum)
      end
    end
  end

  factory :subforum do
    association :forum
    name { Faker::Lorem.words(number: 3).join(' ').titleize }
    
    trait :with_posts do
      after(:create) do |subforum|
        create_list(:forum_post, 5, subforum: subforum)
      end
    end
  end

  factory :forum_post do
    association :user
    association :subforum
    title { Faker::Lorem.sentence(word_count: 4) }
    body { Faker::Lorem.paragraph(sentence_count: 5) }
  end

  factory :comment do
    association :user
    association :forum_post
    body { Faker::Lorem.paragraph(sentence_count: 2) }
  end
end