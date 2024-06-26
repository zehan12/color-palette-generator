import { Spinner } from "@/components/common/Spinner";
import { delayForDisplay } from "@/utils/general.util";
import { FC, Fragment, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => delayForDisplay(import("@/pages/Home")));

const ApplicationRoutes: FC = () => {
  return (
    <Fragment>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":codes" element={<Home />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
};

export default ApplicationRoutes;
