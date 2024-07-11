import React from "react";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import CustomTooltip from "../../components/CustomTooltip";
import CustomButton from "../../components/buttons/CustomButton";

const Users = () => {
    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-full">
            <TopUserBar titleScreen={"Employees"} />
            <Breadcrumbs />

            <CustomTooltip
                sx={{ mt: 14, ml: 6 }}
                tooltipContent={
                    <>
                        <span className="tag">Tag</span>
                        <div className="score">
                            4<span className="extra">+3</span>
                        </div>
                        <span className="label">Leadership</span>
                    </>
                }
                triggerComponent={<CustomButton>Click Me</CustomButton>}
            />
        </main>
    );
};

export default Users;
