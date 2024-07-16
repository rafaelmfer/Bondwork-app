import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import RewardDetailsCard from "../../components/cards/RewardDetailsCard";
import CategoryCard from "../../components/cards/CardDescription";
import { formatDate } from "../../common/commonFunctions";

const RewardsDetails = () => {
    const { id } = useParams();
    const URL = `${process.env.REACT_APP_API_URL}/api/rewards/${id}`;
    const [data, setData] = useState([]);

    console.log(data);
    useEffect(() => {
        const fetchRewards = async () => {
            const headers = new Headers();
            headers.set(
                "Authorization",
                "Basic " + btoa("admin" + ":" + "secret")
            );
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/rewards/${id}`,
                {
                    headers,
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setData(data);
            }
        };

        fetchRewards();
    }, []);

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-[calc(100vh-80px)]">
            <TopUserBar titleScreen={"Rewards"} />
            <Breadcrumbs dynamicTexts={["Rewards Details"]} />

            <div className="grid grid-cols-2 gap-6 mb-6">
                <RewardDetailsCard
                    sx={{ mt: "24px", mb: "24px" }}
                    rewardName={data.title}
                    imageSrc={
                        data.image
                            ? data.image
                            : "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/picture-rewardLunch.jpg?alt=media&token=2a7c7aca-0d6d-41b1-af6c-4b3ab7276ade"
                    }
                    statusText={data.status}
                    rewardType={data.category}
                    pointsCost={2000}
                    period={[
                        formatDate(new Date(data.startDate)),
                        formatDate(new Date(data.endDate)),
                    ]}
                    details={data.details}
                />
            </div>
        </main>
    );
};

export default RewardsDetails;
