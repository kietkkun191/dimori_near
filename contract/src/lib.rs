use near_sdk::{env, AccountId, Balance, Gas, Promise, PromiseResult};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;
use near_sdk::PanicOnDefault;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::collections::{UnorderedMap, Vector};
use std::vec::Vec;

#[near_bindgen]
#[derive(PanicOnDefault, BorshDeserialize, BorshSerialize)]
pub struct Contract {
    owner: AccountId,
    total_homes: u32,
    total_bookings: u32,
    homes_by_id: UnorderedMap<u32, Home>,
    homes_by_owner: UnorderedMap<AccountId, Vector<u32>>,
    booking_by_id : UnorderedMap<u32, Booking>,
    booking_by_user : UnorderedMap<AccountId, Vector<u32>>
}

#[derive(Debug, BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Home {
    owner: AccountId,
    home_id: u32,
    name: String,
    address: String,
    city: String,
    img_url: String,
    theme: String,
    description: String,
    price: u128,
}

#[derive(Debug, BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Booking {
    renter: AccountId,
    book_id: u32,
    home_id: u32,
    from_date: u32,
    to_date: u32,
    duration: u128,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn init() -> Self {
        assert!(!env::state_exists(), "Already initialized");
        Self {
            owner: env::predecessor_account_id(),
            total_homes: 0,
            total_bookings: 0,
            homes_by_id: UnorderedMap::new(b"home_by_id".to_vec()), 
            homes_by_owner: UnorderedMap::new(b"home_by_owner".to_vec()),
            booking_by_id: UnorderedMap::new(b"booking_by_id".to_vec()), 
            booking_by_user: UnorderedMap::new(b"booking_by_user".to_vec()),
        }
    }
    // Home
    pub fn create_home(&mut self
        , name: String
        , address: String
        , city: String
        , img_url: String
        , theme: String
        , description: String
        , price: u128) -> Home{
            let owner_id = env::signer_account_id();

            let mut home_ids: Vector<u32>;
            if self
            .homes_by_owner
            .get(&env::predecessor_account_id())
            .is_none()
                {
                    home_ids = Vector::new(b"home_ids".to_vec());
                } else {
                    home_ids = self
                        .homes_by_owner
                        .get(&env::predecessor_account_id())
                        .unwrap();
                }
            home_ids.push(&self.total_homes);

            let home = Home {
                owner: owner_id,
                home_id: self.total_homes,
                name,
                address,
                city,
                img_url,
                theme,
                description,
                price,
            };
            self.homes_by_owner
                .insert(&env::predecessor_account_id(), &home_ids);
            self.homes_by_id.insert(&self.total_homes, &home);
            self.total_homes += 1;
            home
    }

    pub fn update_home(&mut self
        , home_id: u32
        , name: String
        , address: String
        , city: String
        , img_url: String
        , theme: String
        , description: String
        , price: u128) {
            let signer = env::signer_account_id();
            let home = &mut self.homes_by_id.get(&home_id).unwrap();

            if signer != home.owner {
                assert!(signer != home.owner, "Not owner!!");
            }
            else{
                home.name = name;
                home.address = address;
                home.city = city;
                home.img_url = img_url;
                home.theme = theme;
                home.description = description;
                home.price = price;

                self.homes_by_id.remove(&home_id);
                self.homes_by_id.insert(&home_id, &home);
            }
    }

    pub fn remove_home(&mut self, home_id: u32) {
        self.homes_by_id.remove(&home_id);
    }

    pub fn get_home(&self, home_id: u32) -> Home {
        self.homes_by_id.get(&home_id).unwrap()
    }

    pub fn get_all_homes(&self) -> Vec<(u32, Home)> {
        self.homes_by_id.to_vec()
    }

    // Booking
    #[payable]
    pub fn create_booking(& mut self
        , home_id : u32
        , from_date : u32
        , to_date : u32
        , duration: u128) -> Booking {
            let renter_id = env::signer_account_id();
            let mut book_ids:Vector<u32>;

            if self
            .booking_by_user
            .get(&env::predecessor_account_id())
            .is_none()
                {
                    book_ids = Vector::new(b"book_ids".to_vec());
                } else {
                    book_ids = self
                        .booking_by_user
                        .get(&env::predecessor_account_id())
                        .unwrap();
                }
                book_ids.push(&self.total_bookings);

            let booking = Booking {
                renter: renter_id,
                book_id: self.total_bookings,
                home_id:home_id,
                from_date:from_date,
                to_date:to_date,
                duration,
            };

            self.booking_by_user
                .insert(&env::predecessor_account_id(), &book_ids);
            self.booking_by_id.insert(&self.total_bookings, &booking);
            self.total_bookings += 1;
            let amount: u128 = 1_000_000_000_000_000_000_000_000;
            let home = self.homes_by_id.get(&home_id).unwrap();
            let total_price = home.price * duration * amount;

            Promise::new(home.owner).transfer(total_price);

            booking
    }
}

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     // fn test_create_home() {
//     //     let mut contract = Contract::init();
//     //     contract.create_home("H0".to_string(), "32 Main Street".to_string(), 5, 5);
//     //     contract.create_home("H1".to_string(), "55 Main Street".to_string(), 4, 5);
//     //     contract.create_home("H2".to_string(), "44 Main Street".to_string(), 3, 5);

//     //     assert_eq!(contract.get_home(0).name, "H0");
//     //     assert_eq!(contract.get_home(1).name, "H1");
//     //     assert_eq!(contract.get_home(2).name, "H2");

//     //     contract.update_home(0, "CC".to_string(), "AA".to_string(), 9, 5);

//     //     assert_eq!(contract.get_home(0).name, "CC");
//     // }
// }